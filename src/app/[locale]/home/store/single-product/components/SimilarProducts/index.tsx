import React, { useState } from 'react'
import styles from "../productDisplay/style.module.scss";
import { Skeleton } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type similarProductsProps = {
    isFetching:boolean
    data:any
    productId:string | number | null
    ip:any
    addToCart : any
    cartLoading:boolean
    lang:string
}

export default function SimilarProducts(
    {
    isFetching,
    data,
    productId,
    ip,
    addToCart,
    cartLoading,
    lang
    }:similarProductsProps
){
    const [selectedId, setSelectedID] = useState();
    const router = useRouter();
    const addToCartSimilarRequest = async (product_id: any) => {
        setSelectedID(product_id);
        let sendData = {
          product_id: product_id,
          user_ip: ip?.ip,
          amount: 1,
        };
        try {
          await addToCart(sendData).unwrap();
          toast.success("Added to Cart");
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
  return (
    <div >
        {isFetching ? (
          <div className={styles.grid}> 
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
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            <h3 className='font-bold text-3xl text-center'>Related Products</h3>
            <div className={styles.grid}>
              {data?.data?.similar_products?.map((item: any, index: number) => (
                <div className={styles.card} key={index}>
                  <Link
                    href={{
                      pathname: `/${lang}/home/store/single-product`,
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
                        pathname: `/${lang}/home/store/single-product`,
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
            </div>
          </div>
        )}
      </div>
  )
}
