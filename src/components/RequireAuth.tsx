import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  if (!userId) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
