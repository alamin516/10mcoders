import React from "react";
import Image from "next/image";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface User {
  user: any;
  setOpen: (open: boolean) => void;
}

const UserAvatar: React.FC<User> = ({ user, setOpen }) => {
  const currentPath = usePathname();


  return (
    <>
      {user ? (
        <Link href={"/profile"}>
          <Image
            src={user?.avatar?.url || "/assets/images/user/avatar.png"}
            width={30}
            height={30}
            alt="avatar"
            className={`${currentPath === "/profile" ? "border-[2px] border-green-500" : ""} rounded-full cursor-pointer h-[30px] w-[30px] object-cover`}
          />
        </Link>
      ) : (
        <CircleUserRound
          className="!cursor-pointer h-6 w-6 dark:text-white"
          onClick={() => setOpen(true)}
        />
      )}
    </>
  );
};

export default UserAvatar;
