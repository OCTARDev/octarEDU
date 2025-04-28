"use client";

import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
type params = {
    placeholder:String
    id?:any
    register:any
    errors:any
}
export default function PasswordInput({placeholder,id ="password",register,errors}:params) {
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <>
            <div className="relative input-c1">
                <span className="">
                    <FaLock size={18} className='text-gray-400' />
                </span>
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder={placeholder}
                    id={id}
                    {...register(id)}
                    className="p-3 w-full"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute end-3 top-3.5 text-xl cursor-pointer"
                >
                    {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
            </div>
            {
                errors[id] &&
                <p className='text-statusError text-sm'>{errors[id].message}</p>
            }
        </>
    )
}
