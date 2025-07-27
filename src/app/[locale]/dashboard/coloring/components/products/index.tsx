"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import img from "../../../../../assets/lungs.png";
import Link from "next/link";
import { mainUrl } from "@/lib";
import Loader from "@/components/loader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import {
  useGetColoringCategoriesQuery,
  useLazyGetColoringCategoriesQuery,
} from "@/redux/rtk/coloringCategories";
import { FaUser } from "react-icons/fa";
import { FilterDropdown } from "@/components/dropdown";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const isAuthenticated = () => {
  try {
    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("octar");
      return JSON.parse(userData);
    }
  } catch (e) {
    // //console.log("Error", e);
  }
};
type auth = {
  token?: string;
};
const Products = () => {
  // const [data, setData] = React.useState<any>();
  const [word, setWords] = React.useState("");
  const [status, setStatus] = useState("all");
  const [firstRender, setFirstRender] = useState(true);
  const params = useSearchParams();
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const [loading, setLoading] = React.useState<boolean>(false);
  const useData: auth = isAuthenticated();
  const [open, setOpen] = React.useState(false);
  const paramsApi = {
    search:word,
    status,
    lang,
  };
  const [fetch, { data: dataNew, isLoading, isFetching }] =
    useLazyGetColoringCategoriesQuery();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token: any = useData?.token || "";
  const [singlePrduct, setSingleProduct] = React.useState<any>();
  const t = useTranslations("dashBoardcoloring");

  const header = {
    Authorization: `Bearer ${token}`,
    "X-App-Locale": lang,
  };
  console.log("paramsApi", paramsApi);
  React.useLayoutEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        fetch(paramsApi, true);
      },
      word ? 550 : 0
    );

    return () => clearTimeout(delayDebounceFn);
  }, [word, status]);

  const showModalHandler = (item: any) => {
    setSingleProduct(item);
    handleOpen();
  };
    const tN = useTranslations("categoriesPage");
    const options = [
      { label: tN("options.all"), value: "all" },
      { label: tN("options.free") , value: "free" },
      { label:tN("options.english"), value: "english" },
      { label: tN("options.arabic"), value: "arabic" },
      { label: tN("options.product"), value: "product" },
    ]
  console.log("dataNew", dataNew);
  return (
    <div>
      <div className={styles.filter}>
          <div className={styles.header}>
            <span className="bg-[#F2DAF2] rounded-full p-1">
              <FaUser  color="#321433"/>
            </span>
            <h1 className="capitalize font-bold text-lg">{tN("availableCategories")}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className={styles.inputContainer}>
              <input
                placeholder={t("filters.search")}
                onChange={(e) => {
                  setWords(e.target.value);
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#725073"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.9999 20.9999L16.6499 16.6499"
                  stroke="#725073"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {/* {loading ? "Loading...." : ""} */}
            </div>
            <FilterDropdown
              status={status}
              setStatus={setStatus}
              options={options}
            />
          </div>

        </div>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.secondDiv}>
          {dataNew?.data?.map((e: any, i: number) => {
            return (
              <div className={styles.singleDiv} key={i}>
                {e?.is_publish === 1 ? (
                  <Link
                    href={{
                      pathname: `/${lang}/dashboard/coloring/single`,
                      query: { id: `${e?.id}` },
                    }}
                  >
                    <div className={styles.imageContainer}>
                      <Image
                        src={e?.image}
                        alt="lung"
                        width="1000"
                        height="1000"
                        className={
                          e?.is_publish === 0 ? `${styles.imgOpactiy}` : ""
                        }
                      ></Image>
                      {e?.is_publish === 0 && (
                        <div
                          className={`${
                            e?.is_publish === 0
                              ? `${styles.soon} ${lang === "ar" && "arabic"}`
                              : ""
                          }`}
                        >
                          <h1>{t("soon")}</h1>
                        </div>
                      )}
                    </div>

                    <p>{e?.title}</p>
                    {e?.is_publish === 0 ? (
                      <button onClick={() => showModalHandler(e)}>
                        {t("button.view")}
                      </button>
                    ) : (
                      <Link
                        href={{
                          pathname: `/${lang}/dashboard/coloring/single`,
                          query: { id: `${e?.id}` },
                        }}
                      >
                        <button> {t("button.view")}</button>
                      </Link>
                    )}
                  </Link>
                ) : (
                  <>
                    <div className={styles.imageContainer}>
                      <Image
                        src={e?.image}
                        alt="lung"
                        width="1000"
                        height="1000"
                        className={
                          e?.is_publish === 0 ? `${styles.imgOpactiy}` : ""
                        }
                      ></Image>
                      {e?.is_publish === 0 && (
                        <div
                          className={`${
                            e?.is_publish === 0
                              ? `${styles.soon} ${lang === "ar" && "arabic"}`
                              : ""
                          }`}
                        >
                          <h1>{t("soon")}</h1>
                        </div>
                      )}
                    </div>

                    <p>{e?.title}</p>
                    {e?.is_publish === 0 ? (
                      <button onClick={() => showModalHandler(e)}>
                        {t("button.view")}
                      </button>
                    ) : (
                      <Link
                        // href={`/dashboard/coloring/${e?.id}`}
                        href={{
                          pathname: `/${lang}/dashboard/coloring/single`,
                          query: { id: `${e?.id}` },
                        }}
                      >
                        <button> {t("button.view")}</button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Category Details
          </Typography> */}
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            <div className={styles.soonCategory}>
              <div>
                <h3>Title</h3>
                <span>{singlePrduct?.soon_title}</span>
              </div>
              <div>
                <h3>Description</h3>
                <span>{singlePrduct?.soon_description}</span>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Products;
