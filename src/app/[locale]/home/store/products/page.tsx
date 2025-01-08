"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Header from "./components/header";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Slider,
  Tooltip,
} from "@mui/material";
import { BpCheckbox } from "@/components/forms/checkBox";
import img from "../../../././../assets/store/products/Rectangle 39.png";
import Image from "next/image";
import Link from "next/link";
import Subtotal from "../components/subTotal";
import { useGetcategoriesQuery } from "@/redux/rtk/categories";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import axios from "axios";
import { useGetProductsQuery } from "@/redux/rtk/products";
import Loader from "@/components/loader";
import InfoIcon from "@mui/icons-material/Info";
import { useAddToCartMutation } from "@/redux/rtk/cart";
import { useGetIpQuery } from "@/redux/rtk/ip";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

function valuetext(value: number) {
  return `${value}`;
}
const Products = () => {
  const searchParams = useSearchParams();
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  const productId = searchParams.get("single");
  const { data: ip, isLoading: ipLoading } = useGetIpQuery("");
  let arr: string[] = [];
  const [selectedId, setSelectedID] = useState();
  const [categoriesIds, setCategoriesIds] = useState<any>([productId]);
  const router = useRouter();
  const { data: categories, isLoading: categoriesLoading } =
    useGetcategoriesQuery(lang);
  const [addToCart, { data: cartData, isLoading: cartLoading }] =
    useAddToCartMutation();
  const [all, setAll] = useState<any>("");
  const [value, setValue] = React.useState<number[]>([
    categories?.data?.min_max_Age?.min_age,
    categories?.data?.min_max_Age?.max_age,
  ]);
  //console.log("valuevaluevalue", value);
  useEffect(() => {
    setValue([
      categories?.data?.min_max_Age?.min_age,
      categories?.data?.min_max_Age?.max_age,
    ]);
  }, [categories]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const categoryParams = categoriesIds
    .map((id: any) => `category_ids[]=${id}`)
    .join("&");

  let params: any = {
    user_ip: ip?.ip,
    category_ids: categoryParams,
    age_from: value[0],
    age_to: value[1],
    lang: lang,
  };
  const { data, isLoading, isFetching } = useGetProductsQuery(params);

  categoriesIds?.map((e: number | string) => {
    //console.log(`category_ids[]=${e}`);
    arr.push(`category_ids[]=${e}`);
  });

  const checkValue = (event: any) => {
    var updatedList: any = [...categoriesIds];
    if (event.target.checked) {
      updatedList = [...categoriesIds, event.target.value];
      setAll("");
    } else {
      updatedList.splice(categoriesIds.indexOf(event.target.value), 1);
    }

    setCategoriesIds(updatedList);
  };
  const checkValueAll = (event: any) => {
    if (event.target.checked) {
      setAll(event.target.value);
    } else {
      setAll("");
    }
  };

  useEffect(() => {
    if (all === "all") {
      setCategoriesIds([]);
    }
    // if (categoriesIds.length > 0) {
    //   setAll("");
    // }
  }, [all]);

  const addToCartRequest = async (product_id: any) => {
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
      if (e.message === "Cannot read properties of null (reading 'token')") {
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

      // Swal.fire({
      //   title: "Error",
      //   text: e?.data?.message,
      //   icon: "error",
      //   confirmButtonText: "Ok",
      // });
      //console.log("eeeeeeeeeeeeeeeeeee", e);
    }
  };

  if (isLoading || categoriesLoading) {
    return <Loader />;
  }
  //console.log("valuevaluevaluevaluevaluevalue", value);
  return (
    <>
      <Header isArabic />
      <div className={`${styles.container} ${isArabic && "arabic"}`}>
        <div className={styles.sidebar}>
          <div className={styles.filter}>
            <ul className={styles.filters}>
              <li>
                <BpCheckbox
                  value={"all"}
                  onChange={checkValueAll}
                  checked={all === "all" ? true : false}
                />
                {t("all")}
              </li>
              {categories?.data?.categories?.map((e: any) => {
                return (
                  <li key={e?.id}>
                    <BpCheckbox
                      onChange={checkValue}
                      value={e?.id}
                      checked={
                        categoriesIds?.includes(`${e?.id.toString()}`)
                          ? true
                          : false
                      }
                    />

                    {e?.title}
                  </li>
                );
              })}
              {/* <h3>Age</h3> */}
              {/* <hr /> */}
              {/* <br /> */}
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                getAriaValueText={valuetext}
                // valueLabelDisplay="on"
                min={categories?.data?.min_max_Age?.min_age}
                max={categories?.data?.min_max_Age?.max_age}
                style={{ color: "#9E32A4" }}
              />
              {t("age")}: {value[0]} - {value[1]} {t("year")}
            </ul>
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
              {data?.data?.data?.map((item: any, index: number) => (
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
                      width={500}
                      height={500}
                      layout="responsive"
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
                        <span>{t("description")}: </span>
                        {item.description}
                      </p>
                      <p className={styles.stock}>
                        {item.available > 0 ? t("stock") : "NOt available"}
                      </p>
                    </Link>
                    <div className={styles.flex}>
                      <div className={styles.flexFirst}>
                        <p className={styles.price}>
                          {item?.price} {item?.currency}
                        </p>

                        <p className={styles.originalPrice}>
                          {t("instead")} {item?.instead_of}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={() => addToCartRequest(item?.id)}
                          className={styles.button}
                        >
                          {item?.id === selectedId ? (
                            <>
                              {" "}
                              {cartLoading
                                ? `${t("adding")}...`
                                : t("addToCart")}
                            </>
                          ) : (
                            t("addToCart")
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
      </div>
      <Subtotal />
    </>
  );
};

export default Products;
