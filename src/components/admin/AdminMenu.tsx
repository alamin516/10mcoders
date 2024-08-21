"use client";
import { useLogOutMutation } from "@/lib/features/auth/authApi";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { LogoutOutlined, Notifications, Public } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuIcon from "@mui/icons-material/Menu";
import { CircleUserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {
  handleMenu: () => void;
  display: boolean;
  handleMinimize: () => void;
  minimize: boolean;
};

const AdminNavbar = ({
  handleMenu,
  display,
  handleMinimize,
  minimize,
}: Props) => {
  const [active, setActive] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [logOut, { isLoading }] = useLogOutMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenNotification(false);
    }
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

  const notifications = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center h-16 shadow-sm relative">
      <div
        className={`font-semibold flex ${
          minimize ? "gap-0" : "gap-4"
        } items-center transition duration-[400ms] ease-linear`}
      >
        <span
          className={`cursor-pointer hidden lg:block bg-slate-600 rounded-lg ${
            minimize ? "px-4 rotate-180" : ""
          } p-2 transform transition-transform duration-[400ms] ease-linear`}
          onClick={handleMinimize}
        >
          <Image
            width={24}
            height={24}
            alt=""
            src="/assets/images/menu-fold-line.svg"
            className="w-6 h-6"
          />
        </span>
        <div className="ml-5 bg-white/60 text-black/600 rounded-full w-10 h-10 flex items-center justify-center">
          <Link href={"/"} target="_blank">
            <Public style={{fontSize: "26px"}}/>
          </Link>
        </div>
      </div>

      <div className="lg:pr-5 flex space-x-3 lg:space-x-4 items-center">
        <div
          className="cursor-pointer relative"
          onClick={() => setOpenNotification(true)}
        >
          <Notifications />
          <span className="absolute top-0 right-0 text-xs w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center">
            3
          </span>
        </div>
        {/* Notifications */}
        {openNotification && (
          <div
            className={`fixed w-full h-screen top-0 left-0 z-[999999]`}
            onClick={handleClose}
            id="screen"
          >
            <div
              className={`notification fixed w-[300px] h-[400px] z-[99999] bg-white shadow-md dark:bg-slate-600 dark:bg-opacity-90 top-[64px] right-10 p-4 rounded-md dark:text-white text-black overflow-hidden overflow-y-auto`}
            >
              <div className="flex items-center border-b justify-between pb-2">
                <div className="text-center">Notifications</div>
              </div>
              <div className="top-[30px]">
                {notifications.map((i) => {
                  return (
                    <div
                      key={i}
                      className="pt-3 !cursor-pointer  flex items-center gap-2"
                      onClick={() => setOpenNotification(false)}
                    >
                      <div>
                        <CircleUserRound className="h-8 w-8 dark:text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[12px] mb-0">MERN Stack - ReactJS</p>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] leading-0 m-0">
                            New Order
                          </span>
                          <span className="text-[10px] leading-0 ml-0">
                            5 days ago
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {/* Notifications */}
        <ThemeSwitcher active={active} />

        <div className="hidden 800px:block">
          <div className="cursor-pointer p-2">
            {user ? (
              <div>
                <Image
                  src={user?.avatar?.url || "/assets/images/user/avatar.png"}
                  width={30}
                  height={30}
                  alt="avatar"
                  className={`rounded-full cursor-pointer h-[30px] w-[30px] object-cover`}
                  onClick={() => setOpenProfile(!openProfile)}
                />
              </div>
            ) : (
              <CircleUserRound className="!cursor-pointer h-6 w-6 dark:text-white" />
            )}
          </div>
        </div>
        <div className="block lg:hidden">
          <div className="cursor-pointer p-2" onClick={handleMenu}>
            {display ? <CancelIcon /> : <MenuIcon />}
          </div>
        </div>
      </div>
      {openProfile && (
        <div
          className="absolute min-h-screen left-0 top-0 w-full"
          onClick={() => setOpenProfile(false)}
        >
          <div
            className={`absolute top-[62px] right-[10px] z-10 bg-white text-black min-w-[260px] py-3 rounded-md transition-transform duration-300 transform translate3d(-177px, 65px, 0px) shadow-md border`}
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              <li onClick={() => setOpenProfile(false)}>
                <Link
                  href="/admin/profile"
                  className="text-sm text-gray-800 flex items-center gap-1 px-5 py-2 hover:bg-green-500 hover:text-white transition-colors duration-300"
                >
                  <CircleUserRound style={{ fontSize: "14px" }} /> Profile
                </Link>
              </li>
              <li onClick={() => setOpenProfile(false)}>
                <Link
                  href="/admin/profile"
                  className="text-sm text-gray-800 flex items-center gap-1 px-5 py-2 hover:bg-green-500 hover:text-white transition-colors duration-300"
                  onClick={logOutHandler}
                >
                  <LogoutOutlined style={{ fontSize: "14px" }} /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
