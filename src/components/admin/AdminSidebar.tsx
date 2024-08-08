"use client";
import { useLogOutMutation } from "@/lib/features/auth/authApi";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { menuItems } from "./AdminMenuItems";

type Props = {
  display: boolean;
  minimize: boolean;
};

const Sidebar = ({ display, minimize }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const currentPath = usePathname();
  const [logOut, { isLoading }] = useLogOutMutation();
  const router = useRouter();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDropdownToggle = (index: any) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const logOutHandler = async () => {
    try {
      setLoading(true);
      await signOut({ redirect: false });
      await logOut().unwrap();
      router.push("/");
      toast.success("Logout successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

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
    <aside
      className={`admin-sidebar transform ${
        display ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-[300ms] dark:bg-slate-800 bg-gray-900 text-black ${
        minimize ? "w-[0px]" : "w-64"
      } lg:translate-x-0 lg:static absolute top-[60px] left-0 min-h-screen-minus-60px z-50`}
    >
      <nav className=" flex min-h-[calc(100vh-100px)] flex-col justify-between overflow-hidden">
        <div className="side_nav flex flex-col justify-between py-6 self-stretch max-h-[calc(95vh-100px)] overflow-y-hidden hover:!overflow-auto scrollbar">
          <div className="flex flex-col justify-center items-center text-white mb-3">
            <Link href={"/admin"}>
              <Image
                src={user?.avatar?.url || "/assets/images/user/profile.png"}
                alt=""
                className={`cursor-pointer border-[3px] border-green-500 rounded-full ${
                  minimize ? "w-[50px] h-[50px]" : "w-[120px] h-[120px]"
                }  object-cover shadow-lg dark:shadow-white/10 transition-all duration-300`}
                width={120}
                height={120}
                priority
              />
            </Link>
            <h3>{user?.role}</h3>
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                <Link href={item.href} target={item.target || "_self"}>
                  <li
                    className={`flex items-center justify-center group w-full cursor-pointer relative overflow-hidden py-2 px-4 hover:bg-white dark:hover:bg-slate-900 hover:text-black dark:hover:text-white dark:text-slate-200 ${
                      currentPath === item.href
                        ? "before:absolute before:w-1 before:bg-green-400 before:h-full before:left-0 before:top-0 dark:bg-slate-900 dark:hover:bg-slate-700 bg-white text-green-400 dark:!text-white"
                        : "text-white"
                    } ${
                      openDropdownIndex === index &&
                      item.subItems &&
                      "bg-green-600"
                    }`}
                    onClick={() => handleDropdownToggle(index)}
                  >
                    {item.icon}
                    <div
                      className={`${
                        minimize ? "opacity-0 w-0" : "opacity-100 w-full"
                      } flex items-center transition-all duration-[400ms] ease-linear flex-nowrap justify-between`}
                    >
                      <p className="capitalize whitespace-nowrap ml-[13px] opacity-100 transition-opacity duration-150 ease-linear">
                        {item.label}
                      </p>
                      {item.subItems && (
                        <span className="ml-auto">
                          {openDropdownIndex === index ? (
                            <ArrowDropUpOutlined />
                          ) : (
                            <ArrowDropDownOutlined />
                          )}
                        </span>
                      )}
                    </div>
                  </li>
                </Link>
                {openDropdownIndex === index && item.subItems && (
                  <ul className="bg-slate-700">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link key={subIndex} href={subItem.href}>
                        <li
                          className={`flex items-center justify-start group w-full cursor-pointer relative overflow-hidden py-2 px-4 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-black dark:hover:text-white dark:text-slate-400 ${
                            currentPath === subItem.href
                              ? "before:absolute before:w-1 before:bg-green-400 before:h-full before:left-0 before:top-0 dark:bg-slate-800 dark:hover:bg-slate-700 bg-gray-100 text-green-400 dark:!text-white"
                              : "text-white"
                          } ${minimize ? "!leading-[24px] pl-1" : ""}`}
                        >
                          <div
                            className={`${
                              minimize
                                ? "w-full text-[12px]"
                                : "opacity-100 w-full"
                            } flex items-left transition-all duration-[400ms] ease-linear flex-nowrap justify-between`}
                          >
                            <p className="capitalize whitespace-nowrap ml-[5px] opacity-100 transition-opacity duration-150 ease-linear">
                              {subItem.label}
                            </p>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>
        <div className="py-6 px-4">
          <div
            className="flex items-center group w-full rounded cursor-pointer transition-all duration-[400ms] relative overflow-hidden py-2 px-4 bg-white hover:bg-white dark:bg-slate-900 dark:text-white"
            onClick={logOutHandler}
          >
            <LogoutOutlined />
            <div
              className={`${
                minimize ? "opacity-0 w-full" : "opacity-100 w-full"
              } flex items-center transition-all duration-[400ms] ease-linear flex-nowrap justify-between`}
            >
              <p className="capitalize whitespace-nowrap ml-[13px] opacity-100 transition-opacity duration-150 ease-linear">
                Logout
              </p>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
