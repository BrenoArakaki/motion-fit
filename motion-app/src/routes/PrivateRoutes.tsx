import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/skeleton-card";

type Props = {
  children: React.ReactNode;
};

export function PrivateRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <DashboardSkeleton />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
