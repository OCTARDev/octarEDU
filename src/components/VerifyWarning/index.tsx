"use client";
import { useResendOTPMutation } from '@/redux/rtk/otp';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { IoIosAlert } from 'react-icons/io';
import { toast } from 'react-toastify';

export default function VerifyWarning({}) {
/*     console.log(token); */
    const t = useTranslations("warning");
    const router = useRouter();
    const pathname = usePathname();
    const lang = pathname.split("/")[1];
    const [resendOTP] = useResendOTPMutation();
    const handleClick = async()=>{
      const resendRes = await resendOTP({}).unwrap();
      console.log("res",resendRes?.message);
      toast.success(resendRes?.message ||"OTP Sent To your email ")
      router.push(`/${lang}/otp`)
    }
    
  return (
    <>
        <div 
        onClick={handleClick}
        className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 px-4 py-3 hover:cursor-pointer flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <IoIosAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <span className="text-amber-800 font-medium text-sm">
                {t("h1")}
              </span>
              <span className="text-amber-700 text-sm ml-2">
                {t("h2")}
              </span>
              <button></button>
            </div>
          </div>
{/*           <button>
            X
          </button> */}
        </div>
    </>
  )
}
