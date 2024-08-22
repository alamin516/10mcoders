"use client";
import { useLogOutMutation } from "@/lib/features/auth/authApi";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  LogoutOutlined,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    menuItems.forEach((item, index) => {
      if (item.subItems && item.subItems.some(subItem => subItem.href === currentPath)) {
        setOpenDropdownIndex(index);
      }
    });
  }, [currentPath]);

  const handleDropdownToggle = (index: number) => {
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
      <div className="absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800">
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
      } transition-all duration-[300ms] bg-gray-800 ${
        minimize ? "w-[0px]" : "w-64"
      } lg:translate-x-0 lg:static absolute top-[60px] left-0 min-h-screen-minus-60px z-50`}
    >
      <nav className="flex min-h-[calc(100vh-100px)] flex-col justify-between overflow-hidden">
        <div className="side_nav flex flex-col justify-between py-6 self-stretch max-h-[calc(95vh-0px)] overflow-y-hidden hover:!overflow-auto scrollbar">
          {/* <div className="flex flex-col justify-center items-center text-white mb-3">
            <Link href={"/admin"}>
              <Image
                src={user?.avatar?.url || "/assets/images/user/avatar.png"}
                alt=""
                className={`w-[120px] h-[120px] cursor-pointer border-[3px] border-green-500 rounded-full object-cover shadow-lg dark:shadow-white/10 transition-all duration-300`}
                width={120}
                height={120}
                priority
              />
            </Link>
            <h3>{user?.role}</h3>
          </div> 
          */}
          <ul>
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                <Link href={item.href} target={item?.target || "_self"}>
                  <li
                    className={`flex items-center justify-left group w-full cursor-pointer relative overflow-hidden py-2 px-4  transition-all duration-[400ms] ${
                      currentPath === item.href
                        ? "bg-[#3a3f50] text-white"
                        : "bg-gray-800 text-gray-400"
                    } hover:bg-[#3a3f50] hover:text-white ${
                      openDropdownIndex === index &&
                      item.subItems &&
                      "!bg-[#3a3f50] text-white"
                    }`}
                    onClick={() => handleDropdownToggle(index)}
                  >
                    {item.icon}
                    <div
                      className={`flex items-center transition-all duration-[400ms] ease-linear flex-nowrap justify-between flex-1`}
                    >
                      <p className="capitalize whitespace-nowrap ml-[13px] opacity-100 transition-opacity duration-150 ease-linear">
                        {item.label}
                      </p>
                      {item.subItems && (
                        <span className="ml-auto">
                          {openDropdownIndex === index ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </span>
                      )}
                    </div>
                  </li>
                </Link>
                {openDropdownIndex === index && item.subItems && (
                  <ul className="bg-gray-800">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link key={subIndex} href={subItem.href}>
                        <li
                          className={`flex mt-[2px] items-center justify-start group w-full cursor-pointer relative overflow-hidden py-2 px-4 transition-colors duration-[400ms] ${
                            currentPath === subItem.href
                              ? "bg-[#3a3f50] !text-white"
                              : "bg-gray-800 text-gray-400"
                          } hover:bg-[#3a3f50] hover:text-white`}
                        >
                          <div
                            className={`flex items-left transition-all duration-[400ms] ease-linear flex-nowrap justify-between`}
                          >
                            <p className="capitalize whitespace-nowrap ml-[5px] opacity-100 transition-opacity duration-150 ease-linear flex items-center">
                              <span className="mr-1 text-base">{currentPath === subItem.href ? <RadioButtonChecked style={{fontSize: "14px"}}/>: <RadioButtonUnchecked style={{fontSize: "14px"}}/>}</span>{subItem.label}
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
        <div className="py-6 px-4 800px:hidden">
          <div
            className="flex items-center group w-full rounded cursor-pointer transition-all duration-[400ms] relative overflow-hidden py-2 px-4 bg-[#232631] text-white"
            onClick={logOutHandler}
          >
            <LogoutOutlined />
            <div
              className={`flex items-center transition-all duration-[400ms] ease-linear flex-nowrap justify-between`}
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