"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import lungsImage from "../../../../../assets/lungs.png";
import Image from "next/image";
import { Grid, Skeleton } from "@mui/material";
import Link from "next/link";
import { mainUrl } from "@/lib";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  useGetCategoriesBeforeLoginQuery,
  useLazyGetCategoriesBeforeLoginQuery,
} from "@/redux/rtk/categoriesBeforeLogin";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FilterDropdown } from "@/components/dropdown";
import { FaUser } from "react-icons/fa";
const isAuthenticated = () => {
  try {
    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("octar");
      return JSON.parse(userData);
    }
  } catch (e) {
    //console.log("Error", e);
  }
};
type auth = {
  token?: string;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CategoriesProducts = ({ lang }: { lang: string }) => {
  const [word, setWords] = React.useState("");
  // const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const useData: auth = isAuthenticated();
  const [status, setStatus] = useState("all");
  const token: any = useData?.token || "";
  const isFirstRender = useRef(true);
  const [firstRender, setFirstRender] = useState(true);
  let params = {
    search:word,
    status,
    lang,
  };

  const t = useTranslations("dashBoardcoloring");
  const [fetchApi, { data, isLoading, isFetching }] =
    useLazyGetCategoriesBeforeLoginQuery();
  React.useLayoutEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        fetchApi(params, true);
      },
      word ? 550 : 0
    );

    return () => clearTimeout(delayDebounceFn);
  }, [word, status]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [singlePrduct, setSingleProduct] = React.useState<any>();
  const showModalHandler = (item: any) => {
    setSingleProduct(item);
    handleOpen();
  };
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lastPathName = pathname.split("/");
  let firstLink = lastPathName[1];
  const tN = useTranslations("categoriesPage");
  const options = [
    { label: tN("options.all"), value: "all" },
    { label: tN("options.free") , value: "free" },
    { label:tN("options.english"), value: "english" },
    { label: tN("options.arabic"), value: "arabic" },
  ]
  return (
    <>
      <div className={`${styles.container} ${isArabic && "arabic"}`}>
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
        <div>
          <Grid
            container
            columns={12}
            spacing={2}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <>
              {!isLoading
                ? data?.data?.map((e: any) => {
                    return (
                      <Grid item xs={12} sm={6} lg={3} py={3} key={e?.id}>
                        <div className={styles.singleDiv}>
                          <div className={styles.imageContainer}>
                            {e ? (
                              e?.is_publish === 1 ? (
                                <Link
                                  href={{
                                    pathname: `/${firstLink}/home/categories/organs/single`,
                                    query: { id: `${e?.id}` },
                                  }}
                                >
                                  <Image
                                    src={e?.media}
                                    alt="lung"
                                    width="1000"
                                    height="1000"
                                    className={
                                      e?.is_publish === 0
                                        ? `${styles.imgOpactiy}`
                                        : ""
                                    }
                                  ></Image>
                                </Link>
                              ) : (
                                <Image
                                  src={e?.media}
                                  alt="lung"
                                  width="1000"
                                  height="1000"
                                  className={
                                    e?.is_publish === 0
                                      ? `${styles.imgOpactiy}`
                                      : ""
                                  }
                                ></Image>
                              )
                            ) : (
                              <Skeleton></Skeleton>
                            )}

                            {e?.is_publish === 0 && (
                              <div
                                className={`${
                                  e?.is_publish === 0 ? `${styles.soon}` : ""
                                }`}
                              >
                                {e ? <h1>{t("soon")}</h1> : <Skeleton />}
                              </div>
                            )}
                          </div>
                          {e ? <p>{e?.title}</p> : <Skeleton />}

                          {e?.is_publish === 0 ? (
                            <>
                              {e ? (
                                <>
                                  <button onClick={() => showModalHandler(e)}>
                                    {t("button.show")}
                                  </button>
                                </>
                              ) : (
                                <Skeleton></Skeleton>
                              )}
                            </>
                          ) : (
                            <>
                              {e?.is_publish === 1 ? (
                                <Link
                                  // href={`/home/organs/${e?.id}`}
                                  href={{
                                    pathname: `/${firstLink}/home/categories/organs/single`,
                                    query: { id: `${e?.id}` },
                                  }}
                                >
                                  <button>{t("button.view")}</button>
                                </Link>
                              ) : (
                                <Skeleton />
                              )}
                            </>
                          )}
                        </div>
                        {/* </Link> */}
                      </Grid>
                    );
                  })
                : [1, 2, 3, 4]?.map((e, index) => {
                    return (
                      <Box sx={{ pt: "1rem" }} key={index}>
                        <Skeleton
                          width={300}
                          height={300}
                          sx={{
                            marginRight: "1rem",
                            marginTop: "0",
                            padding: "0",
                          }}
                          variant="rectangular"
                        />
                        <Skeleton
                          width={"60%"}
                          height={30}
                          sx={{
                            marginRight: "1rem",
                            marginTop: "1rem",
                            padding: "0",
                          }}
                          variant="rectangular"
                        />

                        <Skeleton
                          width={"40%"}
                          height={20}
                          sx={{
                            marginRight: "1rem",
                            marginTop: "1rem",
                            padding: "0",
                          }}
                          variant="rectangular"
                        />
                      </Box>
                    );
                  })}
            </>
          </Grid>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 0, textAlign: "center" }}
          >
            <div className={styles.soonCategory}>
              <div>
                <h3>{tN("title")}</h3>
                <span>{singlePrduct?.soon_title}</span>
              </div>
              <div>
                <h3>{tN("description")}</h3>
                <span>{singlePrduct?.soon_description}</span>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default CategoriesProducts;
