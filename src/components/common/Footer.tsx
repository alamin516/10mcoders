 "use client"
import { Language } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
    const [logo, setLogo] = React.useState("");


  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <ul>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
              Dot Learning Business
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Teach on Dot Learning
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Get the app
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Careers
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Blog
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Help and Support
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Affiliate
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Investors
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Terms
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Privacy policy
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Cookie settings
              </Link>
            </li>
            <li className="mb-2">
              <Link href="#" className="hover:underline">
                Sitemap
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Accessibility statement
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-end">
          <div className="mb-4">
            <button className="flex items-center px-4 py-2 border border-white text-white hover:bg-gray-800">
              <Language className="mr-2"/>
              English
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto 800px:flex justify-between pt-20">
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
                  className={`text-[25px] font-Poppins font-[500] text-white !cursor-pointer uppercase`}
                >
                  Dot Learning
                </Link>
              )}
            </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Dot Learning, Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
