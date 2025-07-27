import React from 'react'
const inboxes = {
    title: "Educational Categories",
    categories: [
        'Alphabet', 'Numbers', 'Animals', 'Professions', 
        'Space', 'Fruits', 'Hygiene', 'And More...'
    ]
}
const categories = [
    'Alphabet', 'Numbers', 'Animals', 'Professions', 
    'Space', 'Fruits', 'Hygiene', 'And More...'
  ];
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
    <div className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Inside the Box</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                High-quality educational cards divided into categories for different ages, plus everything you need to get started
            </p>
            </div>
            
            <div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 capitalize">
                    <h3 className="text-xl text-center font-bold text-gray-900 mb-4">{data?.title}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {data?.in_box_details?.map((category, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                            <span className="text-gray-700 font-medium text-sm">{category?.title}</span>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
