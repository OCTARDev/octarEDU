"use client";
import { useStoreNurseryMutation } from '@/redux/rtk/studentNursery';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaUser } from "react-icons/fa";
import { toast } from 'react-toastify';

type FormValues = {
  student_name: string;
};



export default function NurseryAddPage() {
  const router = useRouter();
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const {reset,register,handleSubmit,formState:{errors}} = useForm<FormValues>();
  /* console.log(data); */
  

  const [updateProfile, {isSuccess,isError:updateIsError,error:updateError}] = useStoreNurseryMutation();
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
      toast.success("Added Successfully");
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
          <span>Nursery Add Page</span>
        </div>
      </div>
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
    </div>
  )
}
