import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const menuItemsData = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Courses",
    path: "/courses",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "FAQ",
    path: "/faq",
  },
];

interface Props {
  isMobile: boolean;
}

export const NavItems: React.FC<Props> = ({ isMobile }) => {
  const currentPath = usePathname()


  return (
    <>
      <div className="hidden 800px:flex">
        {menuItemsData &&
          menuItemsData.map((item, index) => {
            return (
              <Link key={index} href={`${item.path}`}>
                <span
                  className={`${
                    currentPath === item.path
                      ? "dark:text-green-600 text-green-500"
                      : "dark:text-white"
                  } text-[18px]  px-6 font-Poppins font-[400]
}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
          {menuItemsData &&
            menuItemsData.map((item, index) => {
              return (
                <Link key={index} href={`${item.path}`}>
                  <span
                    className={`${
                      currentPath === item.path
                        ? "dark:text-green-600 text-green-500"
                        : "dark:text-white"
                    } block text-[18px]  px-6 py-5 font-Poppins font-[400]}`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
        </div>
      )}
    </>
  );
};
