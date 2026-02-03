"use client";
import ErrorBoundary from '@/components/ErrorBoundary';
import { useResendOTPMutation } from '@/redux/rtk/otp';
import { useGetHelpQuery, useGetProfileQuery, useUpdateProfileMutation } from '@/redux/rtk/profile';
import { useNurseryShowQuery, useUpdateNurseryMutation } from '@/redux/rtk/studentNursery';
import { useTranslations } from 'next-intl';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';

type FormValues = {
  student_name: string;

};



export default function NurseryAddPage() {
  const {id} = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const { data,isLoading,isError,error} = useNurseryShowQuery(id); 
  const {reset,register,handleSubmit,formState:{errors}} = useForm<FormValues>();


  useEffect(()=>{
    if(data){
      const {student_name} = data?.data;
      reset({student_name})
    }
  },[data,reset]);
  const [updateProfile, {isSuccess,isError:updateIsError,error:updateError}] = useUpdateNurseryMutation();
  const onSubmit = async(data:FormValues)=>{
    try{
      const response = await updateProfile({id,...data});
    }catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    if (isSuccess) {
      // ✅ onSuccess logic
      toast.success("Updated Successfully");
      router.push(`/${lang}/dashboard/studentNursery`);
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
          <span>Edit Student Information</span>
        </div>
      </div>
      <ErrorBoundary isLoading={isLoading} isError={isError} error={error}>
      <section className='rounded-lg border p-3'>
        <form className='flex flex-col gap-4 capitalize' onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className='input-control'>
            <label>Student Name</label>
            <input 
              placeholder='Enter Student Name'
              type='text'
              {...register("student_name")}
            />
          </div>
             
          {/* Button */}
          <div className='flex justify-end'>
            <button 
              className='px-4 py-2 bg-[#9A32A4] text-white rounded-xl hover:bg-[#9A32A4]/80 disabled:bg-black capitalize'
              type='submit'
              >
                Submit
            </button>
          </div>
        </form>
      </section>
      </ErrorBoundary>
    </div>
  )
}
