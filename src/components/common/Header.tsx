"use client";

import { useSocialAuthMutation } from "@/lib/features/auth/authApi";
import CustomModal from "@/utils/CustomModal";
import ThemeSwitcher from "@/utils/ThemeSwitcher";
import { CircleUserRound, Text } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import Verification from "../Auth/Verification";
import { NavItems } from "./NavItems";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

interface Props {}

const Header: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
  const { data: session } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logo, setLogo] = useState("");
  const router = useRouter()


  useEffect(() => {
    if (session && !user) {
      const socialLogin = async () => {
        try {
          await socialAuth({
            email: session.user?.email,
            name: session.user?.name,
            avatar: session.user?.image,
          }).unwrap();

          isSuccess && toast.success("Logged in successfully");
        } catch (error) {
          toast.error("Error logging in");
          console.error("Error during social login", error);
        }
      };
      socialLogin();
    }
  }, [session, user, socialAuth, isSuccess]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative glass-morphism">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[90] border-b dark:border-[#ffffff1c] duration-300"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[90] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full flex items-center justify-between p-3">
            <div>
              {logo ? (
                <Link href={"/"}>
                  <Image
                    src={logo}
                    width={200}
                    height={30}
                    alt="Logo"
                    className="rounded-full cursor-pointer object-contain w-40 h-10"
                  />
                </Link>
              ) : (
                <Link
                  href={"/"}
                  className={`text-[25px] font-Poppins font-[500] text-black dark:text-white !cursor-pointer uppercase ${
                    active && "text-white"
                  } `}
                >
                  Dot Learning
                </Link>
              )}
            </div>
            <div className="flex items-center gap-5">
              <NavItems isMobile={false} />
              <ThemeSwitcher active={active} />
              <div className={`${active && "text-white"}`}>
                <UserAvatar user={user} setOpen={setOpen} />
              </div>
              {/* mobile view */}
              <div className={`${active && "text-white"} 800px:hidden`}>
                <Text
                  className="!cursor-pointer h-6 w-6 dark:text-white transform rotate-180"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
            </div>
          </div>
        </div>
        {/*mobile sidebar */}
        {openSidebar && (
          <div
            className={`fixed w-full h-screen top-0 left-0 z-50 dark:bg-[unset] bg-[#00000024] `}
            onClick={handleClose}
            id="screen"
          >
            <div
              className={`fixed w-[70%] z-50 h-screen bg-white dark:bg-slate-900 top-0 right-0`}
            >
              <div className="h-[80px] flex items-center border-b justify-between">
                <Text
                  className="!cursor-pointer h-6 w-6 dark:text-white transform rotate-180 ml-4"
                  onClick={() => setOpenSidebar(false)}
                />
                <div className="text-center mr-4">
                  <Link
                    href={"/"}
                    className={`text-[22px] font-Poppins font-[500] text-black dark:text-white `}
                  >
                    Dot Learning
                  </Link>
                </div>
              </div>

              <NavItems isMobile={true} />
              <br />
              <div className="px-2 pl-5 hidden">
                {user ? (
                  <Link href={"/profile"}>
                    <Image
                      src={user?.avatar.url || "/assets/images/user/avatar.png"}
                      width={30}
                      height={30}
                      alt="avatar"
                      className="rounded-full cursor-pointer"
                    />
                  </Link>
                ) : (
                  <CircleUserRound
                    className="!cursor-pointer h-6 w-6 dark:text-white"
                    onClick={() => {
                      setOpen(true);
                      setOpenSidebar(false);
                    }}
                  />
                )}
              </div>
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                copyright @ {new Date(Date.now()).getFullYear()} Dot Learning
              </p>
            </div>
          </div>
        )}
      </div>

      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
