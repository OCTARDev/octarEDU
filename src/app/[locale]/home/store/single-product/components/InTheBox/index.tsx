import { motion } from 'framer-motion';
import React from 'react'

  type props = {
    data:box;
}

type box = {
    id?:number;
    product_id?:number;
    title:string;
    in_box_details:{
        id?:number;
        in_box_id?:number;
        title:string;
    }[]
}
export default function InTheBoxComponent({data}:props) {
  return (
    <motion.div 
        initial={{opacity:0,x:100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1.5}} 
        className="py-12 bg-white"
        >
        <div className="max-w-5xl mx-auto px-4">
           {/*
           <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Inside the Box</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    High-quality educational cards divided into categories for different ages, plus everything you need to get started
                </p>
            </div>
            */} 
            
            <div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 capitalize">
                    <h3 className="text-xl text-center font-bold text-gray-900 mb-4">{data?.title}</h3>
                    <div className="flex flex-col gap-3">
                        {data?.in_box_details?.map((category, index) => (
                            <p key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200" dangerouslySetInnerHTML={{__html: category?.title || ''}}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  )
}
