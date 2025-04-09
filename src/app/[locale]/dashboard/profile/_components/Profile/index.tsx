"use client";
import ErrorBoundary from '@/components/ErrorBoundary';
import { useGetHelpQuery, useGetProfileQuery, useUpdateProfileMutation } from '@/redux/rtk/profile';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';

type FormValues = {
  first_name: string;
  last_name: string;
  email:string;
  phone:string;
  country_code:string;
  country:string;
};



export default function ProfileSection() {
  const [disabled,setDisabled] = useState(true);
  const { data,isLoading,isError,error} = useGetProfileQuery();
  const {data:helpData,isLoading:helpIsLoading,isError:helpIsError,error:helpError} = useGetHelpQuery();  
  const {reset,register,handleSubmit,formState:{errors}} = useForm<FormValues>();

  const t = useTranslations("dashboardProfile");
  useEffect(()=>{
    if(data){
      const {first_name,last_name,email,phone,country_code,country} = data?.data;
      const numberOnly = country_code.replace(/\D/g,"");      
      reset({first_name,last_name,email,phone,country_code:numberOnly,country})
    }
  },[data,reset]);
  const [updateProfile, {isSuccess,isError:updateIsError,error:updateError}] = useUpdateProfileMutation();
  const onSubmit = async(data:FormValues)=>{
    try{
      const response = await updateProfile(data);
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    if (isSuccess) {
      // ✅ onSuccess logic
      toast.success("Updated Successfully");
      setDisabled(true);
    }
  
    if (updateIsError) {
      // ❌ onError logic
      toast.error("Error Occurred");
      console.log(updateError);
      
    }
  },[updateIsError,isSuccess,updateError])
  
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex md:justify-between md:flex-row flex-col'>
        <div className='flex gap-2 items-center font-bold '>
          <span className='bg-[#9E32A4]/20 p-2 rounded-full'><FaUser size={22} color='#9E32A4'/></span>
          <span>{t("header")}</span>
        </div>
        <div>
          <button 
          type='button'
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800'
          onClick={()=>setDisabled(!disabled)}
          >
            {t("editButton")}
          </button>
        </div>
      </div>
      <ErrorBoundary isLoading={isLoading || helpIsLoading} isError={helpIsError || isError } error={error || helpError}>
      <section className='rounded-lg border p-3'>
        <h2 className='mb-10 font-bold text-2xl'>{t("information")}</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className='input-control'>
            <label>{t("email")}</label>
            <input 
              placeholder='Enter Your email Address'
              type='email'
              {...register("email")}
              disabled
            />
          </div>
          {/* First and last Name */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <div className='input-control'>
              <label>{t("first")}</label>
              <input 
              disabled={disabled}
              {...register("first_name",{required:"First Name Is Required"})}
              placeholder='Enter First Name'
              />
            </div>
            {errors.first_name && 
            <p className='text-red-500 text-sm'>{errors?.first_name.message}</p>}
            <div className='input-control'>
              <label>{t("last")}</label>
              <input 
              disabled={disabled}
              {...register("last_name",{required:"Last Name Is Required"})}
              placeholder='Enter Last Name'
              />
            </div>
            {errors.last_name && 
            <p className='text-red-500 text-sm'>{errors?.last_name.message}</p>}
          </div>
          {/* Phone Number */}
          <div>
            <label>{t("phone")}</label>
            <div className='flex gap-2 items-center'>
              <div className='input-control w-20'>
                <select
                  disabled={disabled}
                  {...register("country_code",{required:"Phone Code Is Required"})}
                >
                {
                  helpData?.data?.phone_code?.map((p:any,i:number)=>{
                    return(
                      <option key={i} value={p?.phone_code}>{p?.phone_code}</option>
                    )
                  })
                }
                </select>
              </div>
              <div className='input-control flex-grow'>
                <input 
                  disabled={disabled}
                  {...register("phone",{required:"Phone Number Is Required"})}
                  type='tel'
                  placeholder='Phone '
                />
              </div>
            </div>
          </div>
          {errors.phone && 
            <p className='text-red-500 text-sm'>{errors?.phone.message}</p>}
          {/* Country */}
          <div className='input-control'>
            <label>{t("country")}</label>
            <select
            disabled={disabled}
            {...register("country",{required:"Country Is Required"})}
            >
              {helpData?.data?.countries?.map((country:any,i:number)=>{
                return(
                  <option key={i} value={country?.name}>{country?.name}</option>
                )
              })}
            </select>
          </div>
          {errors.country && 
            <p className='text-red-500 text-sm'>{errors?.country.message}</p>}
          {/* Button */}
          <div className='flex justify-end'>
            <button 
              className='px-4 py-2 bg-[#9A32A4] text-white rounded-xl hover:bg-[#9A32A4]/80 disabled:bg-black'
              disabled={disabled}
              type='submit'
              >
                {t("submit")}
            </button>
          </div>
        </form>
      </section>
      </ErrorBoundary>
    </div>
  )
}
