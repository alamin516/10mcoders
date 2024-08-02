import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useLoadUserQuery } from "./features/api/apiSlice";

type Props = {
  children: React.ReactNode;
};

const AdminProtected = ({ children }: Props) => {
  const { data, isLoading, refetch } = useLoadUserQuery("loadUser");

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-24 w-24 border-t-0 border-b-0 border-green-500"></div>
      </div>
    );
  }

  const user = data?.user;
  const isAdmin = user?.role === "admin";
  return isAdmin ? children : redirect("/");
};

export default AdminProtected;
