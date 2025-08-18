import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {Welcome}from "@/components/ui/welcom"

const API_BASE = import.meta.env.VITE_API_BASE || "/api"; // لا تكرّري /api مرّتين

type Endpoint = "login" | "register";

export default function LoginPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");   // الاسم (للتسجيل)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const callApi = async (endpoint: Endpoint) => {
    setLoading(true);
    try {
      const payload =
        endpoint === "register" ? { name, email, password } : { email, password };

      // المسار النهائي: /api/login أو /api/register
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);

      // احفظ الاسم لعرضه في النافبار (أولوية: من السيرفر ثم من الإدخال ثم من الإيميل)
      const displayName =
        (data?.name && String(data.name).trim()) ||
        (name && name.trim()) ||
        (email.includes("@") ? email.split("@")[0] : email);

      localStorage.setItem("userId", String(data.id));
      localStorage.setItem("displayName", displayName);
      window.dispatchEvent(new Event("user:updated")); // يحدث النافبار فورًا

      toast({
        title: endpoint === "login" ? "تم تسجيل الدخول ✅" : "تم التسجيل ✅",
        description: `مرحبًا ${displayName}!`,
      });

      navigate("/"); // الصفحة الرئيسية
    } catch (err: any) {
      toast({
        title: "خطأ",
        description: err?.message || "تعذر إتمام الطلب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <Welcome/>
      <div className="container mx-auto px-4">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="max-w-sm w-full space-y-4 border rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold text-center">تسجيل الدخول / إنشاء حساب</h2>

            {/* الاسم يُستخدم عند التسجيل */}
            <Input
              placeholder="الاسم الكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="كلمة المرور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex gap-2">
              <Button className="flex-1" disabled={loading} onClick={() => callApi("login")}>
                دخول
              </Button>
              <Button
                className="flex-1"
                variant="secondary"
                disabled={loading}
                onClick={() => callApi("register")}
              >
                تسجيل
              </Button>
            </div>
          </div>
        </div>
      </div>
  <footer className="bg-primary text-primary-foreground py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            Created by <span className="font-semibold">Arwa Alswilem</span> -Frontend Developer
          </p>
      
    <div className="flex justify-center gap-6 text-sm">
  <a
  href="https://ruh-s3.bluvalt.com/nhcsa/uploads/NHC-Portfolio-V4-20250123.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:underline"
>
 About NHC
</a>
  <a
  href="https://www.linkedin.com/in/arwa-alswilem-5299982a3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:underline"
>
  My linkedin
</a>
    
    </div>
        </div>
      </footer>
    </div>
  );
}
