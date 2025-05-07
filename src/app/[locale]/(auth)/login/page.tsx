"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { redirect, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import Link from "next/link";
import { useLoginMutation } from "@/redux/rtk/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/reducers/auth/authSlice";
import { useTranslations } from "next-intl";
import Input from "@/shared/Input";
import { FaRegUser } from "react-icons/fa";
import PasswordInput from "../_components/PasswordInput";
import SideImageComponent from "../_components/SideImage";
import youtubeSVG from "@/assets/youtube.svg";
import Image from "next/image";


type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<number>>;
};
const Login = () => {
  const pathname: string = usePathname();
  const lastPathName = pathname.split("/");
  let firstLink = lastPathName[1];
  const isArabic = pathname.includes("/ar");
  const [loading, setLoading] = useState<boolean>(false);
  const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [err, setErr] = useState<any>();
  const schema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be valid email"),

    password: yup.string().required("Password is required").min(6),
  });
  const t = useTranslations("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("dataLogin", data?.data?.user?.email_verified_at);
  useEffect(() => {
    if (data) {
      if (data?.data?.user?.email_verified_at) {
        router.push(`/${firstLink}/dashboard/home`);
      } else {
        router.push(`/${firstLink}/otp`);
      }
    }
  }, [data,firstLink,router]);
  const onSubmit = async (data: any) => {
    try {
      const res = await login({ ...data }).unwrap();
      await localStorage.setItem("octar", JSON.stringify(res.data));
      await dispatch(loginSuccess());
      if (res?.data?.email_verified_at) {
        // await router.push(`/${firstLink}/dashboard/home`);
      } else {
        // await router.push(`/${firstLink}/otp`);
      }
      // await router.push(`/${firstLink}/dashboard/home`);
    } catch (error: any) {
      toast.error(`${error.data.message}`);
    }
  };
  const mapForErr = () => {
    if (err?.message) {
      for (const property in err?.message) {
        return (
          <p className="err">
            {property}: {err?.message[property]}
          </p>
        );
      }
    }
  };

  return (
    <>
      <NavBar/>
      <main className={`grid grid-cols-1 min-h-screen  sm:grid-cols-2 ${isArabic && "arabic"}`} >
            {/* left form */}
            <section className='flex flex-col gap-2 px-2'>
              <div className='flex-grow flex flex-col items-center justify-center'>
                <form className='flex flex-col gap-5 pb-4' onSubmit={handleSubmit(onSubmit)}>
                  <h1 className='text-3xl font-bold text-center'>{t("signIn")}</h1>
                  <span className='text-start text-gray-500 font-bold'>{t("des")}</span>
                  {/* form */}
                  {/* choose your role */}
                  {/* inputs */}
                  <Input
                  register={register}
                  id={"email"}
                  placeholder={t("enterEmail")}
                  icon={<FaRegUser size={18} className='text-gray-400'/>}
                  errors={errors}
                  />
                  {/* password */}
                  <PasswordInput
                    placeholder={t("pass")}
                    register={register}
                    errors={errors}
                  />
                  {/* remember me &  Forgot password */}
                  <div className='flex gap-3 my-2 justify-end px-2 text-sm text-gray-500'>
                    <Link className='hover:underline text-[#9e32a4] font-bold' href={`/${firstLink}/forget-password`}>{t("forget")}</Link>
                  </div>
                  {/* Button */}
                  <div>
                    <button 
                    className='btn btn-primary  w-full !py-4 !rounded-3xl' 
                    type='submit'>
                      {loading || isLoading ? `${t("signIn")}...` : t("signIn")}
                    </button>
                  </div>
                  {/* Link to register */}
                  <div className='text-sm text-center flex gap-1 justify-center'>
                    <span className='text-gray-500'>{t("dont")}</span>
                    <Link href={`/${firstLink}/sign-up`} className='text-[#9e32a4] font-bold hover:underline'>{t("create")}</Link>
                  </div>
                  {/* How To Register Video */}
                  <div className="flex justify-center mt-2 capitalize font-semibold">
                    <a 
                    href={t("youtube_link")} 
                    target="_blank" 
                    className="border-2 w-fit px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                      <span>
                        <Image
                      src={youtubeSVG}
                      alt="youtube svg"
                      width={32}
                      height={32}
                      />
                      </span>
                      <span>{t("youtube_label")}</span>
                    </a>
                  </div>
                </form>
                
              </div>
            </section>
            {/* right image */}
            <SideImageComponent />
      </main>
      <Footer />
    </>
  );
};

export default Login;
