"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetIpQuery } from "@/redux/rtk/ip";
import Loader from "@/components/loader";
import { useGetSingleProductQuery } from "@/redux/rtk/cart";
import Subtotal from "../../../components/subTotal";
import { useAddToCartMutation, useGetAllCartQuery } from "@/redux/rtk/cart";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import FAQComponent from "../FAQ";
import SimilarProducts from "../SimilarProducts";
import KeyFeaturesComponent from "../Features";
import { AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Play } from "lucide-react";
import VideoModal from "@/components/VideoModal";
import InTheBoxComponent from "../InTheBox";


const vidsArray = [
  {
    id:1,
    name:"Video",
    src:"/vidtest.mp4"
  }
]

const ProductDisplay = () => {
  const reducers: any = useSelector((reducer: any) => reducer?.auth);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<any | null>(null);
  const [tapIndex , setTapIndex] = useState<number>(0);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { data: ip, isLoading } = useGetIpQuery("");
  const [amount, setAmount] = useState<number>(1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const lang = pathname.split("/")[1];

  function onImageLoad() {
    setLoading(false);
    //console.log("loaded");
  }
  let params = {
    user_ip: ip?.ip,
    id: productId,
  };
  const fireLogin = async() => {
    return Swal.fire({
      title: "You need to login",
      text: "Please login to continue",
      icon: "warning",
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/${lang}/login`);
      }
    });
  };
  const {
    data,
    isLoading: productLoading,
    isFetching,
  } = useGetSingleProductQuery(params);

  const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();
  const singleItem = data?.data?.product;
  /* console.log(singleItem); */
  
  const [selectedImg, setSelectedImg] = useState<any>(
    singleItem?.media[0]?.file_path
  );
  useEffect(() => {
    setSelectedImg(singleItem?.media[0]?.file_path);
  }, [singleItem]);

  const addToCartRequest = async () => {
    let sendData = {
      product_id: productId,
      user_ip: ip?.ip,
      amount: amount,
    };
    try {
      await addToCart(sendData).unwrap();
      await toast.success("Added to cart");
    } catch (e: any) {
      if (e?.status === 401) {
        toast.error("You are not logged in");
        fireLogin();
      }
      Swal.fire({
        title: "Error",
        text: e?.data?.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleAddAmount = () => {
    if (reducers?.data?.token) {
      setAmount((prevValue) => Math.max(1, prevValue + 1));
    } else {
      fireLogin();
    }
  };
  const handleMinusAmount = () => {
    if (reducers?.data?.token) {
      setAmount((prevValue) => Math.max(1, prevValue - 1));
    } else {
      fireLogin();
    }
  };
  const playVideo = (video:any) => {
    setCurrentVideo(video);
    setShowVideoModal(true);
  };

  if (isLoading || productLoading) {
    return <Loader />;
  }
  return (
    <>
      {
        showVideoModal && currentVideo && 
        <VideoModal 
          setShowVideoModal={setShowVideoModal}
          currentVideo={currentVideo}        
        />
      }
      <div className={styles.container}>
        {/* left gallery */}
        <div className={styles.imageGallery}>
          <div className={styles.thumbnailList}>
            {singleItem?.media?.map((e: any) => {
              return (
                <Image
                  src={e?.file_path}
                  alt="Thumbnail 2"
                  className={`${styles.thumbnail} ${
                    e?.file_path === selectedImg ? styles?.selected : ""
                  }`}
                  onClick={() => setSelectedImg(e?.file_path)}
                  key={e?.id}
                  width={95}
                  height={95}
                />
              );
            })}
            {
              singleItem?.videos?.map((v:any)=>{
                return(
                  <span 
                  onClick={()=>playVideo(v)}
                  key={v.id} 
                  className="w-14 h-14 flex justify-center items-center cursor-pointer border-2 mb-1 rounded-lg"
                  >
                    <Play  size={28}/>
                  </span>
                  
                )
              })
            }
          </div>
          
          <div className={styles.mainImage}>
            {loading ? (
              <>Loading...</>
            ) : (
              <>
                <Image
                  src={selectedImg || singleItem?.media[0]?.file_path}
                  alt="Main"
                  width={648}
                  height={420}
                  onLoad={onImageLoad}
                  // priority
                />
              </>
            )}
          </div>
        </div>
        {/* right info */}
        <div className="w-3/6 flex flex-col capitalize">
          {/* Title */}
          <h2 className="font-extrabold mb-4">{singleItem?.title}</h2>
          {/* Description */}
          <p className="flex flex-col">
            <strong className="text-[#9e32a4]">Description:</strong>
            <span className="text-gray-500 text-sm">{singleItem?.description}</span>
          </p>
          {/* Quantity and Discount  */}
          <div className="flex items-center gap-4">
            {/* quantity  */}
            <div className={styles.quantity}>
              <button onClick={() => handleMinusAmount()}>-</button>
              <span>{isNaN(amount) ? 0 : amount}</span>
              <button onClick={() => handleAddAmount()}>+</button>
            </div>
            {/* Discount  */}
            {/* <div>
              <input 
              type="text" 
              className="border p-2"
              placeholder="Enter Discount Code"
              />
            </div> */}
          </div>
          <p className={styles.stock}>
            {singleItem?.available} items available in the stock
          </p>
          <div className="my-2 flex items-center gap-4">
            <span className="font-bold transition-all duration-500">Share:</span>
            <FaFacebookF size={20} className="text-[#9e32a4] hover:text-[#a887a8] hover:cursor-pointer hover:scale-[1.25] transition-all duration-500"/>
            <FaTwitter size={20} className="text-[#9e32a4] hover:text-[#a887a8] hover:cursor-pointer hover:scale-[1.25] transition-all duration-500"/>
            <FaLinkedinIn size={20} className="text-[#9e32a4] hover:text-[#a887a8] hover:cursor-pointer hover:scale-[1.25] transition-all duration-500"/>
            <FaInstagramSquare size={20} className="text-[#9e32a4] hover:text-[#a887a8] hover:cursor-pointer hover:scale-[1.25] transition-all duration-500"/>
          </div>
          <div className={styles.cartContainer}>
            <div>
              <p className={styles.price}>
                {singleItem?.price} {singleItem?.currency}
              </p>
              <p className={styles.originalPrice}>
                Instead of {singleItem?.instead_of} {singleItem?.currency}
              </p>
            </div>
            <div className={styles.buttons}>
              <button className={styles.buyNow}>Buy now</button>
              <button className={styles.addToCart} onClick={addToCartRequest}>
                {cartLoading ? "Adding..." : "Add to cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2 items-center justify-center py-2 mt-4">
        <button className={`btn ${tapIndex === 0 ? "bg-[#9e32a4] text-white":"text-[#9e32a4] border"} `} onClick={()=>setTapIndex(0)}>key features</button>
        <button className={`btn ${tapIndex === 1 ? "bg-[#9e32a4] text-white":"text-[#9e32a4] border"}`} onClick={()=>setTapIndex(1)}>faqs</button>
        <button className={`btn ${tapIndex === 2 ? "bg-[#9e32a4] text-white":"text-[#9e32a4] border"}`} onClick={()=>setTapIndex(2)}>In The Box</button>
      </div>
      <AnimatePresence>
      {
        tapIndex === 0 ? (
          <KeyFeaturesComponent data={singleItem?.key_features}/>
        ) :
        tapIndex === 1 ? (
          <FAQComponent data={singleItem?.f_a_qs}/>
        ) : 
          tapIndex === 2 ? (
            <InTheBoxComponent data={singleItem?.in_boxes}/>
          ):
        <></>
      }
      </AnimatePresence>
      <SimilarProducts 
        isFetching={isFetching}
        data={data}
        productId={productId}
        lang={lang}
        ip={ip}
        addToCart={addToCart}
        cartLoading={cartLoading}
      />
      <Subtotal />
    </>
  );
};

export default ProductDisplay;
