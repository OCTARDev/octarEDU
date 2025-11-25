import React from 'react'
import {  Star, Gift,  Shield, Globe, Zap, Heart } from 'lucide-react';
import {motion} from "framer-motion";
import Image from 'next/image';

type props = {
    data:key_feature[];
}

type key_feature = {
    id?:number;
    product_id?:number;
    title:string;
    description?:string;
    icon:any;
}

export default function KeyFeaturesComponent({data}:props) {
  return (
    <motion.div 
    initial={{opacity:0,x:100}}
    animate={{opacity:1,x:0}}
    transition={{duration:1}}
    className="py-6 ">
        <div className=" px-4">
            <div className=" mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600">
                Everything you need for an amazing AR learning experience
            </p>
            </div>
            
            <div className="flex flex-col gap-4">
            {data?.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 capitalize">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{feature.title}</h3>
                    <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{__html: feature.description || ''}}/>
                </div>
            ))}
            </div>
        </div>
    </motion.div>
  )
}
