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
  const [data, setData] = React.useState<any>();
  const [word, setWord] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const useData: auth = isAuthenticated();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const token: any = useData?.token || "";
  const [singlePrduct, setSingleProduct] = React.useState<any>();
  const header = {
    Authorization: `Bearer ${token}`,
  };
  React.useLayoutEffect(() => {
    const fetchApi = async () => {
      await setLoading(true);
      const data = await fetch(
        `${mainUrl}/coloring-activities?search=${word}`,
        {
          headers: header,
        }
      )
        .then((response) => {
          setLoading(false);
          return response.json();
        })
        .catch((e) => {
          // //console.log("EEEEEEEEEEEEEEEE", e);
          setLoading(false);
        });
      setData(data);
    };
    const delayDebounceFn = setTimeout(() => {
      fetchApi();
    }, 550);

    return () => clearTimeout(delayDebounceFn);
  }, [word]);
  //console.log("data", data?.data?.data);
  // if (loading) {
  //   return <Loader />;
  // }
  const showModalHandler = (item: any) => {
    setSingleProduct(item);
    handleOpen();
  };
  //console.log("singlePrduct", singlePrduct);
  return (
    <div>
      <div className={styles.firstDiv}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M12 12.5C10.9 12.5 9.95833 12.1083 9.175 11.325C8.39167 10.5417 8 9.6 8 8.5C8 7.4 8.39167 6.45833 9.175 5.675C9.95833 4.89167 10.9 4.5 12 4.5C13.1 4.5 14.0417 4.89167 14.825 5.675C15.6083 6.45833 16 7.4 16 8.5C16 9.6 15.6083 10.5417 14.825 11.325C14.0417 12.1083 13.1 12.5 12 12.5ZM4 20.5V17.7C4 17.1333 4.14583 16.6125 4.4375 16.1375C4.72917 15.6625 5.11667 15.3 5.6 15.05C6.63333 14.5333 7.68333 14.1458 8.75 13.8875C9.81667 13.6292 10.9 13.5 12 13.5C13.1 13.5 14.1833 13.6292 15.25 13.8875C16.3167 14.1458 17.3667 14.5333 18.4 15.05C18.8833 15.3 19.2708 15.6625 19.5625 16.1375C19.8542 16.6125 20 17.1333 20 17.7V20.5H4Z"
            fill="#321433"
          />
        </svg>
        <h1> Activities</h1>
        {/* <input
          type="search"
          onChange={(e) => {
            setWord(e.target.value);
          }}
          placeholder="search categories"
        ></input> */}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.secondDiv}>
          {data?.data?.data?.map((e: any, i: number) => {
            return (
              <div className={styles.singleDiv} key={i}>
                <Link
                  // href={`/dashboard/activity/${e?.id}`}
                  href={{
                    pathname: "/dashboard/activity/single",
                    query: { id: `${e?.id}` },
                  }}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      src={e?.cover}
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
                          e?.is_publish === 0 ? `${styles.soon}` : ""
                        }`}
                      >
                        <h1>soon</h1>
                      </div>
                    )}
                  </div>

                  <p>{e?.title}</p>
                  {e?.is_publish === 0 ? (
                    <button onClick={() => showModalHandler(e)}>
                      show more
                    </button>
                  ) : (
                    <Link
                      // href={`/dashboard/activity/${e?.id}`}
                      href={{
                        pathname: "/dashboard/activity/single",
                        query: { id: `${e?.id}` },
                      }}
                    >
                      <button>View details</button>
                    </Link>
                  )}
                </Link>
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
