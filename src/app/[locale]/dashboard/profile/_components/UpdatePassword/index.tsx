"use client";
import { useUpdatePasswordMutation } from '@/redux/rtk/profile';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from "yup";


type FormValues = {
    old_password:string;
    password:string;
    c_password:string;
}

const passwordValidation = Yup.object().shape({
    old_password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
  
    c_password: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

export default function UpdatePasswordSection() {
    const {handleSubmit,register,formState:{errors}} = useForm<FormValues>({resolver:yupResolver(passwordValidation)});
    const  [updatePassword,{isSuccess,isError,error}] = useUpdatePasswordMutation();
    const t = useTranslations("dashboardProfile");
    const onSubmit = async(data:FormValues)=>{
        try{
            const response = await updatePassword(data);
          }catch(e){
            console.log(e);
          }
    }

      useEffect(()=>{
        if (isSuccess) {
          // ✅ onSuccess logic
          toast.success("Password Updated Successfully");
        }
      
        if (isError) {
          // ❌ onError logic
          toast.error( "Error Occurred While Changing Password");
        }
      },[isError,isSuccess,error])
  return (
    <section className='rounded-lg border p-3'>
        <h3 className='text-2xl font-bold mb-10'>{t("passwordHeader")}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'> 
            {/* old password */}
            <div className='input-control'>
                <label>{t("oldPassword")}</label>
                <input 
                    type='password'
                    {...register("old_password")}
                    placeholder={t("placeholderOldPassword")}
                />
            </div>
            {errors.old_password && 
            <p className='text-red-500 text-sm'>{errors?.old_password.message}</p>}
            {/* password */}
            <div className='input-control'>
                <label>{t("newPassword")}</label>
                <input 
                    type='password'
                    {...register("password")}
                    placeholder={t("placeholderNewPassword")}
                />
            </div>
            {errors.password && 
            <p className='text-red-500 text-sm'>{errors?.password.message}</p>}
            {/* confirm password */}
            <div className='input-control'>
                <label>{t("cPassword")}</label>
                <input 
                    type='password'
                    {...register("c_password")}
                    placeholder={t("placeholderCPassword")}
                />
            </div>
            {errors.c_password && 
            <p className='text-red-500 text-sm'>{errors?.c_password.message}</p>}
            {/* Button */}
            <div className='flex justify-end'>
                <button 
                className='px-4 py-2 bg-[#9A32A4] text-white rounded-xl hover:bg-[#9A32A4]/80 disabled:bg-black'
                type='submit'
                >
                    {t("submit")}
                </button>
          </div>
        </form>
    </section>
  )
}
