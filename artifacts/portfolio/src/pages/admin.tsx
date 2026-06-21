import { useLocation } from "wouter";
import AdminPanel from "@/components/AdminPanel";

export default function AdminPage() {
  const [, navigate] = useLocation();
  return (
    <AdminPanel isOpen={true} onClose={() => navigate("/")} />
  );
}
