"use client";

import React from 'react'
type params = {
    placeholder:String
    id:any
    register:any
    icon:any
    type?:String
    errors:any
}
export default function Input({placeholder,id,register,icon,type,errors}:params) {
    return (
        <>
        <div className="input-c1">
            <span className="">
                {icon}
            </span>
            <input
                type={type}
                placeholder={placeholder}
                id={id}
                {...register(id)}
                className="p-3 w-full"
            />
        </div>
        {
            errors[id] &&
            <p className='text-statusError text-sm'>{errors[id].message}</p>
        }
        </>
    )
}
