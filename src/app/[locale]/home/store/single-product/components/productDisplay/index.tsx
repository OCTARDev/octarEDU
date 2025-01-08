"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Header from "../header";
import Image from "next/image";
import img1 from "../../../../../../assets/productDisplay/Rectangle 39.png";
import img2 from "../../../../../../assets/productDisplay/Rectangle 53.png";
import img3 from "../../../../../../assets/productDisplay/Rectangle 54.png";
import img4 from "../../../../../../assets/productDisplay/Rectangle 55.png";
import img5 from "../../../../../../assets/productDisplay/Rectangle 56.png";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetIpQuery } from "@/redux/rtk/ip";
import Loader from "@/components/loader";
import { useGetSingleProductQuery } from "@/redux/rtk/cart";
import Subtotal from "../../../components/subTotal";
import { useAddToCartMutation, useGetAllCartQuery } from "@/redux/rtk/cart";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import Link from "next/link";

const ProductDisplay = () => {
  const reducers: any = useSelector((reducer: any) => reducer?.auth);
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { data: ip, isLoading } = useGetIpQuery("");
  const [amount, setAmount] = useState<number>(1);
  const router = useRouter();
  const [selectedId, setSelectedID] = useState();
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
  const fireLogin = () => {
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
  const {
    data: cartData,
    isLoading: carttLoading,
    isFetching: cartFetching,
  } = useGetAllCartQuery("");
  const findSingleProduct = () => {
    let singleProduct = cartData?.data?.cart.find(
      (item: any) => item.product_id == productId
    );
    return singleProduct;
  };

  let initalNumber: number = Number(findSingleProduct()?.amount);
  //console.log("initalNumber", initalNumber);

  const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();
  const singleItem = data?.data?.product;
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
  const addToCartSimilarRequest = async (product_id: any) => {
    setSelectedID(product_id);
    let sendData = {
      product_id: product_id,
      user_ip: ip?.ip,
      amount: 1,
    };
    try {
      await addToCart(sendData).unwrap();
      await toast.success("Added to Cart");
    } catch (e: any) {
      if (e?.status === 401) {
        toast.error("You are not logged in");
        Swal.fire({
          title: "You need to login",
          text: "Please login to continue",
          icon: "warning",
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/${lang}/login`);
          }
        });
      }
      Swal.fire({
        title: "Error",
        text: e?.data?.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  if (isLoading || productLoading) {
    return <Loader />;
  }
  //console.log("cartData", cartData?.data?.cart);

  //console.log("productId", productId);
  //console.log("filePath", singleItem?.media[0]?.file_path);
  //console.log("selectedImg", selectedImg);
  return (
    <>
      <div className={styles.container}>
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
        <div className={styles.productDetails}>
          <h2>{singleItem?.title}</h2>
          <p className={styles.description}>
            <strong>Description:</strong> {singleItem?.description}
            <br />
            <br />
            {singleItem?.sub_info?.map((e: any) => {
              return (
                <div key={e?.id}>
                  - {e?.key}: {e?.value}
                  <br />
                </div>
              );
            })}
            {/* <br />
            - key: Value
            <br />
            - key: Value
            <br /> */}
            <br />
            {/* Neque auctor tincidunt pulvinar tristique pellentesque pretium quis.
            Sed tortor sit orci aliquet nunc. */}
          </p>
          <div className={styles.quantity}>
            <button onClick={() => handleMinusAmount()}>-</button>
            <span>{isNaN(amount) ? 0 : amount}</span>
            <button onClick={() => handleAddAmount()}>+</button>
          </div>
          <p className={styles.stock}>
            {singleItem?.available} items available in the stock
          </p>
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
      <div className={styles.grid}>
        {isFetching ? (
          <div>
            <Skeleton variant="rectangular" width={"100%"} height={250} />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
              width={70}
              height={40}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1rem" }}
              width={"100%"}
              height={60}
            />
            <Skeleton variant="text" width={140} height={40} />
          </div>
        ) : (
          <>
            {data?.data?.similar_products?.map((item: any, index: number) => (
              <div className={styles.card} key={index}>
                <Link
                  href={{
                    pathname: "/home/store/single-product",
                    query: {
                      categoryID: productId,
                      productId: `${item?.id}`,
                    },
                  }}
                >
                  <Image
                    src={item.single_media?.file_path}
                    alt={item.title}
                    className={styles.image}
                    width={341.33}
                    height={274}
                  />
                </Link>

                <div className={styles.details}>
                  <Link
                    href={{
                      pathname: "/home/store/single-product",
                      query: {
                        categoryID: productId,
                        productId: `${item?.id}`,
                      },
                    }}
                  >
                    <div className={styles.flex}>
                      <h2>{item.title}</h2>
                    </div>
                    <p className={styles.description}>
                      <span>Description: </span>
                      {item.description}
                    </p>
                    <p className={styles.stock}>
                      {item.available > 0
                        ? "available in the stock"
                        : "NOt available"}
                    </p>
                  </Link>
                  <div className={styles.flex}>
                    <div className={styles.flexFirst}>
                      <p className={styles.price}>
                        {item?.price} {item?.currency}
                      </p>

                      <p className={styles.originalPrice}>
                        Instead of {item?.instead_of}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => addToCartSimilarRequest(item?.id)}
                        className={styles.button}
                      >
                        {item?.id === selectedId ? (
                          <> {cartLoading ? "Adding..." : "Add to cart"}</>
                        ) : (
                          "Add to cart"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Subtotal />
    </>
  );
};

export default ProductDisplay;
