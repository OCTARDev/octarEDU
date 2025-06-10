"use client";
import React from "react";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import { useTranslations } from "next-intl";
import { useGetServiceQuery } from "@/redux/rtk/services";
import Loader from "@/components/loader";
import GallerySlider from "@/components/GallerySlider";
import Image from "next/image";

const SingleService = () => {
  const {id} = useParams();
  const pathname: string = usePathname();  
  const lang = pathname.split("/")[1];
  const t = useTranslations("EducationalPage");

  const {data,isLoading} = useGetServiceQuery({lang,id});
  const slider = data?.data?.slider?.map((img:any,i:any)=>{
    return {
      src:img,
      id:i,
      alt:`Slice ${i + 1}`
    }
  });
  const sections = data?.data?.sections;
  if (isLoading ) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col gap-4  py-6 mx-auto min-h-screen mt-12 md:mt-28 ">
      {/* Header Image */}
      <div className="w-full">
        <GallerySlider 
        images={slider}
        />
      </div>
      <div>
      </div>
      {/* Sections */}
      <div className="mt-12 px-12 flex flex-col gap-8 max-w-screen-xl mx-auto">
        <h2 className="font-bold text-4xl text-center mt-4 capitalize">{data?.data?.title}</h2>
        <iframe
          style={{width:"100%",height:"500px" ,border:"none"}}
          src={data?.data?.video_url}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      {
        sections?.map((s:any,i:number)=>{
          return(
            <section key={i} className="flex flex-col gap-2 my-8 items-center">
              <h3 className="font-bold text-2xl">{s?.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: s?.description }} />
              {/* <p>{s?.description}</p> */}
              <div className="w-full h-full flex-shrink-0 relative">
                <Image 
                src={s?.media}
                alt={s?.title}
                className="w-full object-cover h-80"
                height={200}
                width={800}
                />
              </div>
            </section>
          )
        })
      }
      </div>
    </div>
  );
};

export default SingleService;
