"use client";
import { useLoadUserQuery } from "@/lib/features/api/apiSlice";
import { useUpdatePasswordMutation } from "@/lib/features/user/userApi";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword = (props: Props) => {
  const [loadUser, setLoadUser] = useState(false);
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation()
  const { refetch } = useLoadUserQuery("loadUser");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [value, setValue] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const password = {
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
    };

    if(password){
        await updatePassword(password);
    }

    if(error){
        toast.error(`${error?.data?.message}`)
    }
  };

  return (
    <>
      <div className="w-full pl-6 800px:pl-10">
        <h2 className="text-center dark: text-white mb-5">
            Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] mx-auto block pb-4">
            <div className="w-full relative">
              <label
                htmlFor="oldPassword"
                className="block dark:text-white text-sm font-bold mb-2"
              >
                Old Password
              </label>
              <input
                type={!showOldPassword ? "password" : "text"}
                id="oldPassword"
                name="oldPassword"
                value={value.oldPassword}
                onChange={handleOnChange}
                placeholder="******"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {!showOldPassword ? (
                <EyeOffIcon
                  className="absolute bottom-2 right-2 z-1 cursor-pointer dark:text-black"
                  onClick={() => setShowOldPassword(true)}
                />
              ) : (
                <>
                  <EyeIcon
                    className="absolute bottom-2 right-2 z-1 cursor-pointer dark:text-black"
                    onClick={() => setShowOldPassword(false)}
                  />
                </>
              )}
            </div>
            <div className="w-full pt-2 relative">
              <label
                htmlFor="email"
                className="block dark:text-white text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                type={!showNewPassword ? "password" : "text"}
                id="newPassword"
                name="newPassword"
                value={value.newPassword}
                onChange={handleOnChange}
                placeholder="******"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {!showNewPassword ? (
                <EyeOffIcon
                  className="absolute bottom-2 right-2 z-1 cursor-pointer dark:text-black"
                  onClick={() => setShowNewPassword(true)}
                />
              ) : (
                <>
                  <EyeIcon
                    className="absolute bottom-2 right-2 z-1 cursor-pointer dark:text-black"
                    onClick={() => setShowNewPassword(false)}
                  />
                </>
              )}
            </div>

            <div className="flex items-center justify-center mt-6">
              <button
                type="submit"
                className={`font-bold py-2 px-4 rounded w-full ${!value.oldPassword && !value.newPassword ? "bg-gray-500 " : "bg-green-500 hover:bg-green-700 text-white "}`}
                disabled={value.oldPassword === "" && value.newPassword === ""}
              >
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
