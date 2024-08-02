"use client";
import { useLoadUserQuery } from "@/lib/features/api/apiSlice";
import {
  useUpdateAvatarMutation,
  useUpdateNameMutation,
} from "@/lib/features/user/userApi";
import Heading from "@/utils/Heading";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

const Profile: React.FC<Props> = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [updateName, { isSuccess: succeed, error: updateError }] =
    useUpdateNameMutation();
  const { refetch } = useLoadUserQuery("loadUser");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setMobile(user.mobile);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleAvatar = async (e: any) => {
    const fileReader = new FileReader();

    try {
      fileReader.onload = async () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result;
          await updateAvatar(avatar);
          if (isSuccess) {
            toast.success("Avatar Updated");
            refetch();
          }
          if (error) {
            toast.error("There is an error to update avatar");
          }
        }
      };

      fileReader.readAsDataURL(e.target.files[0]);
    } catch (error) {
      toast.error("An error occurred while updating avatar");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateName({ name, mobile });
      toast.success("User info updated successfully");
      refetch();
    } catch {
      toast.error("An error occurred while updating user info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Heading
        title={`${user?.name} profile`}
        description="This is a learning platform for beginner"
        keywords="Programming, React, JavaScript"
      />
      <div className="min-h-[calc(100vh-80px)]">
        <div className="w-full flex justify-center">
          <div className="relative">
            <Image
              src={user?.avatar?.url || "/assets/images/user/profile.png"}
              alt=""
              className="cursor-pointer border-[3px] border-green-500 rounded-full w-[120px] h-[120px] object-cover shadow-lg dark:shadow-white/10"
              width={120}
              height={120}
              priority
            />
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleAvatar}
              accept="image/png, image/jpg, image/jpeg, image/webp"
              className="hidden"
            />
            <label htmlFor="avatar">
              <div className="w-[30px] h-[30px] bg-slate-700 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer p-1">
                <Camera className="z-1 text-white" />
              </div>
            </label>
          </div>
        </div>
        <br />
        <br />

        <div className="w-full pl-6 800px:pl-10">
          <form onSubmit={handleSubmit}>
            <div className="800px:w-[50%] mx-auto block pb-4">
              <div className="w-full">
                <label
                  htmlFor="fullName"
                  className="block dark:text-white text-sm font-bold mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full pt-2">
                <label
                  htmlFor="email"
                  className="block dark:text-white text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  readOnly
                  value={user?.email}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="w-full pt-2">
                <label
                  htmlFor="mobile"
                  className="block dark:text-white text-sm font-bold mb-2"
                >
                  {user?.mobile ? "Mobile" : "Add mobile"}
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex items-center justify-center mt-6">
                <button
                  type="submit"
                  className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
