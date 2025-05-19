"use client";
import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Loader from "@/components/loader";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { useAddCodeCategoryMutation, useGetCodeCategoriesQuery } from "@/redux/rtk/CodeCategories";
import { toast } from "react-toastify";

const Products = () => {
  const [code, setCode] = React.useState("");
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const tN = useTranslations("codeCategoriesPage");
  const { data: dataNew, isLoading, isFetching , refetch } = useGetCodeCategoriesQuery(lang);
  const [addCodeCategory] = useAddCodeCategoryMutation();
  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    try {
      const res = await addCodeCategory({ code, lang }).unwrap();      
      setCode('');
      toast.success(res?.message || 'Category added!');
      refetch();
    } catch (err:any) {
      console.error('Failed to add category:', err);
      toast.error(err?.data?.message || "Error adding category");
    }
  }  
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="bg-[#F2DAF2] rounded-full p-1">
          <FaUser  color="#321433"/>
        </span>
        <h1 className="capitalize font-bold text-lg">{tN("products")}</h1>
      </div>
      <div className="flex flex-col gap-4 my-4 font-bold text-[#321433]">
        <h2>{tN("havecode")}</h2>
        <p>{tN("enterlabel")}</p>
      </div>
      {/* send code form */}
      <form className="flex items-center gap-4 mt-3" onSubmit={handleSubmit}>
        {/* input component */}
        <div className="flex items-center border border-gray-300 rounded px-3 py-2 w-fit bg-white">
          <div className="text-lg mr-2 text-gray-700">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.66667 14.6666L16 2.66663L23.3333 14.6666H8.66667ZM23.3333 29.3333C21.6667 29.3333 20.25 28.75 19.0833 27.5833C17.9167 26.4166 17.3333 25 17.3333 23.3333C17.3333 21.6666 17.9167 20.25 19.0833 19.0833C20.25 17.9166 21.6667 17.3333 23.3333 17.3333C25 17.3333 26.4167 17.9166 27.5833 19.0833C28.75 20.25 29.3333 21.6666 29.3333 23.3333C29.3333 25 28.75 26.4166 27.5833 27.5833C26.4167 28.75 25 29.3333 23.3333 29.3333ZM4 28.6666V18H14.6667V28.6666H4ZM23.3333 26.6666C24.2667 26.6666 25.0556 26.3444 25.7 25.7C26.3444 25.0555 26.6667 24.2666 26.6667 23.3333C26.6667 22.4 26.3444 21.6111 25.7 20.9666C25.0556 20.3222 24.2667 20 23.3333 20C22.4 20 21.6111 20.3222 20.9667 20.9666C20.3222 21.6111 20 22.4 20 23.3333C20 24.2666 20.3222 25.0555 20.9667 25.7C21.6111 26.3444 22.4 26.6666 23.3333 26.6666ZM6.66667 26H12V20.6666H6.66667V26ZM13.4 12H18.6L16 7.79996L13.4 12Z" fill="#414141"/>
            </svg>

          </div>
          <input
            type="text"
            placeholder={tN("searchlabel")}
            className="outline-none placeholder-gray-500"
            onChange={(e)=>setCode(e.target.value)}
            value={code}
            required
          />
        </div>
        {/* submit button */}
        <button className={styles.btn} type="submit">
          {tN("confirm")}
        </button>
      </form>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.secondDiv}>
          {dataNew?.data?.map((e: any, i: number) => {
            return (
              <div key={e?.id} className="flex flex-col gap-2">
                  <div className={styles.imageContainer} >
                      <Image
                        src={e?.image}
                        alt="lung"
                        width="1000"
                        height="1000"
                        className="rounded-xl border-2 border-[#A887A8] "
                      />
                    </div>
                    <div className="flex flex-col gap-1 text-center">
                      <h4 className="font-bold text-lg">{e?.title}</h4>
                      <p className="font-semibold text-sm">{e?.codes}</p>
                    </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
