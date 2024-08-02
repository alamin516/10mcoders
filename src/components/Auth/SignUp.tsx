"use client";
import { useRegisterMutation } from "@/lib/features/auth/authApi";
import { styles } from "@/styles/style";
import { Google } from "@mui/icons-material";
import { useFormik } from "formik";
import { EyeIcon, EyeOffIcon, Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name."),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
  mobile: Yup.string().required("Please enter your mobile number."),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      } else {
        console.log("An error occurred", error);
      }
    }
  }, [isSuccess, error, setRoute, data]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", mobile: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, mobile }) => {
      const data = {
        name,
        email,
        password,
        mobile
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="p-4">
      <h1 className={`${styles.title}`}>Join to Dot Learning</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className={`${styles.label}`}>
          Enter your name here
        </label>
        <input
          type="text"
          id="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Mr. John Doe"
          className={`${
            errors.name && touched.name && "border-red-500"
          } w-full text-black dark:text-white bg-transparent border rounded !h-[40px] px-2 outline-none mt-[10px] font-Poppins`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        <div className="mt-5">
          <label htmlFor="email" className={`${styles.label}`}>
            Enter your email here
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="SignUpaddress@****.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>
        <div className="mt-5">
          <label htmlFor="mobile" className={`${styles.label}`}>
            Enter your mobile here
          </label>
          <input
            type="mobile"
            id="mobile"
            value={values.mobile}
            onChange={handleChange}
            placeholder="Your mobile number"
            className={`${
              errors.mobile && touched.mobile && "border-red-500"
            } ${styles.input}`}
          />
          {errors.mobile && touched.mobile && (
            <span className="text-red-500 pt-2 block">{errors.mobile}</span>
          )}
        </div>
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password here
          </label>
          <input
            type={!show ? "password" : "text"}
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="********"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <EyeOffIcon
              className="absolute bottom-2 right-2 z-1 cursor-pointer dark:text-white"
              onClick={() => setShow(true)}
            />
          ) : (
            <>
              <EyeIcon
                className="absolute bottom-2 right-2 z-1 cursor-pointer dark:text-white"
                onClick={() => setShow(false)}
              />
            </>
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 p-2 block">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input type="submit" value="SignUp" className={`${styles.button}`} />
        </div>
        <div className="w-full mt-8 text-center">
          <p className={`${styles.label}`}>Or join with</p>
        </div>
        <div className="flex items-center justify-center my-3 gap-2">
          <Google
            className="cursor-pointer dark:text-black text-white bg-green-600 dark:bg-white p-2 rounded-full !w-10 !h-10"
            onClick={() => signIn("google")}
          />
          <Github className="cursor-pointer dark:text-black text-white bg-green-600 dark:bg-white p-2 rounded-full w-10 h-10" />
        </div>
        <div className="w-full mt-8 text-center">
          <p className={`${styles.label}`}>
            Already have an account?{" "}
            <span
              className="text-green-500 cursor-pointer"
              onClick={() => setRoute("Login")}
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
