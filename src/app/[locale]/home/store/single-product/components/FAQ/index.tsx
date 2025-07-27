import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react'
import {motion} from "framer-motion";

type props = {
    data:faqs[];
}

type faqs = {
    id?:number;
    product_id?:number;
    description?:string;
    title:string;
}

export default function FAQComponent({data}:props) {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const toggleFaq = (index:any) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };
  return (
      <motion.div 
        initial={{opacity:0,x:100}}
        animate={{opacity:1,x:0}}
        transition={{duration:1.5}} 
        className="space-y-4 px-4"
        >
        <div className="pt-12 ">
          <div className=" px-4">
            <div className="text-start mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:px-5">
          {data.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden capitalize">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors capitalize"
              >
                <span className="text-gray-900 font-semibold text-lg">{faq?.title}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="px-8 pb-6 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed pt-4">{faq?.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </motion.div>
  )
}
