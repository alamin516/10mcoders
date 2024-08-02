"use client";
import SidebarProfile from "@/components/client/Pages/Profile/SidebarProfile";
import SimpleLayout from "@/components/master/SimpleLayout";
import { useLogOutMutation} from "@/lib/features/auth/authApi";
import Protected from "@/lib/UserProtected";
import { signOut} from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [scroll, setScroll] = useState(false);
  const [logOut, { isLoading }] = useLogOutMutation();
  const router = useRouter()
  const [loading, setLoading] = useState(false)

 
  const logOutHandler = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false });
      await logOut().unwrap();
      router.push("/");
      setLoading(false);
      toast.success("Logout successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };


  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  if (loading) {
    return (
      <div className="absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center  bg-gray-800">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    );
  }

  return (
    <Protected>
      <SimpleLayout>
        <div className="w-[85%] flex mx-auto 800px:gap-10">
          <div
            className={`w-[60px] 800px:w-[350px] h-[450px] bg-white dark:bg-slate-900  border border-[#ffffff1d] rounded-lg shadow-md my-[80px] sticky ${
              scroll ? "top-[120px]" : "top-[30px]"
            } left-[30px]`}
          >
            <SidebarProfile user={user} logOutHandler={logOutHandler} />
          </div>

          <div className="my-[80px] flex-1">{children}</div>
        </div>
      </SimpleLayout>
    </Protected>
  );
};

export default ProfileLayout;
