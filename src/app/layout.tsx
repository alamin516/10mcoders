"use client";
import { Josefin_Sans, Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/lib/Provider";
import { SessionProvider } from "next-auth/react";
import Preloader from "@/components/common/Preloader";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-t dark:from-gray-900 dark:to-black`}
        suppressHydrationWarning={true}
      >
        {/* <Preloader/> */}
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class">
              {children}
              <Toaster position={"top-center"} reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
