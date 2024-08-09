"use client";
import AdminNavbar from "@/components/admin/AdminMenu";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProtected from "@/lib/AdminProtected";
import useMediaQuery from "@/utils/MediaQuery";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const isBetweenMdAndLg = useMediaQuery();
  const [display, setDisplay] = useState(false);
  const [minimize, setMinimize] = useState(false);

  const handleMenu = () => {
    setDisplay(!display);
  };

  const handleMinimizeSidebar = () => [setMinimize(!minimize)];

  useEffect(() => {
    if (isBetweenMdAndLg) {
      setMinimize(true);
    } else {
      setMinimize(false);
    }
  }, [isBetweenMdAndLg]);

  return (
    <AdminProtected>
      <div className="flex flex-col h-screen bg-blue-800 dark:bg-slate-800">
        <AdminNavbar
          handleMenu={handleMenu}
          display={display}
          handleMinimize={handleMinimizeSidebar}
          minimize={minimize}
        />
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar display={display} minimize={minimize} />
          <main className={`admin-main flex-1 ${minimize ? "" : "sm:rounded-tl-lg lg:rounded-tl-lg"} dash-bg dark:bg-slate-900 bg-slate-50 p-5 overflow-y-auto`}>
            {children}
          </main>
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminLayout;
