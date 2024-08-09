import { BookOpenText, LockIcon, LogOut, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  user: {
    avatar: {
      url: string;
    };
    name: string;
    role: string;
  };
  logOutHandler: any;
};

const SidebarProfile = ({ user, logOutHandler }: Props) => {
  const currentPath = usePathname();

  return (
    <div className="flex flex-col gap-1 800px:p-3">
      <Link
        href={"/profile"}
        className={`${
          currentPath === "/profile"
            ? "shadow-lg glass-morphism bg-green-500/60 dark:bg-white/20  dark:text-white rounded-md transition-all duration-[300ms]"
            : "text-black dark:text-white"
        } flex items-center gap-4 px-4 py-1`}
      >
        {<Image
          src={user?.avatar?.url || "/assets/images/user/avatar.png"}
          width={35}
          height={35}
          alt="User Avatar"
          className="rounded-full h-[35px] w-[35px] object-cover"
        />}
        <span className="text-base 800px:block hidden font-Poppins">
          My Account
        </span>
      </Link>
      {<Link
        href={"/profile/change-password"}
        className={`${
          currentPath === "/profile/change-password"
            ? "shadow-lg glass-morphism bg-green-500/60 dark:bg-white/20  dark:text-white rounded-md transition-all duration-[300ms]"
            : "text-black dark:text-white"
        } flex items-center gap-4 px-4 py-2`}
      >
        <LockIcon className="h-[24px] w-[24px]" />
        <span className="text-base 800px:block hidden font-Poppins">
          Change Password
        </span>
      </Link>}
      <Link
        href={"/profile/enrolled-courses"}
        className={`${
          currentPath === "/profile/enrolled-courses"
            ? "shadow-lg glass-morphism bg-green-500/60 dark:bg-white/20  dark:text-white rounded-md transition-all duration-[300ms]"
            : "text-black dark:text-white"
        } flex items-center gap-4 px-4 py-2`}
      >
        <BookOpenText className="h-[24px] w-[24px]" />
        <span className="text-base 800px:block hidden font-Poppins">
          Enrolled Courses
        </span>
      </Link>
      {user?.role === "admin" && (
        <Link
          href={"/admin"}
          className={`text-black dark:text-white flex items-center gap-4 px-4 py-2`}
        >
          <Shield className="h-[24px] w-[24px]" />
          <span className="text-base 800px:block hidden font-Poppins">
            Admin Dashboard
          </span>
        </Link>
      )}
      <button
        className="flex items-center gap-4 px-4 py-2 text-black dark:text-white cursor-pointer"
        onClick={logOutHandler}
      >
        <LogOut className="h-[24px] w-[24px]" />
        <span className="text-base 800px:block hidden font-Poppins">
          LogOut
        </span>
      </button>
    </div>
  );
};

export default SidebarProfile;
