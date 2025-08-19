import { useEffect, useState } from "react";
import { Search, Heart, Home, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import luluLogo from "@/assets/Picture1.svg";
import luluLoo from "@/assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const readAll = () => {
      setUserId(localStorage.getItem("userId"));
      setDisplayName(localStorage.getItem("displayName"));
    };
    readAll();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "userId" || e.key === "displayName") readAll();
    };
    const onUserUpdated = () => readAll();

    window.addEventListener("storage", onStorage);
    window.addEventListener("user:updated", onUserUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("user:updated", onUserUpdated);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("displayName");
    setUserId(null);
    setDisplayName(null);
    if (location.pathname !== "/") navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src={luluLogo} alt="NHC" className="h-10 w-auto" />
          <img src={luluLoo} alt="Mamur" className="h-12 w-auto" />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="ابحث عن المشروع…"
              className="pl-10 bg-card border-border/60 focus:border-primary/40 transition"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/">
              <Home className="h-4 w-4 ml-1" />
              اسكتشف
            </Link>
          </Button>

          <Button
            variant={location.pathname === "/favorites" ? "default" : "ghost"}
            asChild
          >
            <Link to="/favorites">
              <Heart className="h-4 w-4 ml-1" />
              المفضلة
            </Link>
          </Button>

          {/* حالة المستخدم */}
          {userId ? (
            <>
              <span className="hidden md:inline-flex items-center text-sm text-muted-foreground">
                <User className="h-4 w-4 ml-1" />
                {/* أولوية عرض الاسم، مع fallback على #userId */}
                {displayName?.trim() ? displayName : `#${userId}`}
              </span>
              <Button variant="ghost" onClick={logout}>
                <LogOut className="h-4 w-4 ml-1" />
                خروج
              </Button>
            </>
          ) : (
            location.pathname !== "/login" && (
              <Button
                variant={location.pathname === "/login" ? "default" : "ghost"}
                asChild
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4 ml-1" />
                  تسجيل الدخول
                </Link>
              </Button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

