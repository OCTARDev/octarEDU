"use client";
import React from "react";
import styles from "./style.module.scss";
import { useGetSongsQuery } from "@/redux/rtk/songs";
import Loader from "@/components/loader";
import { Box, Modal, Typography } from "@mui/material";

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

const Slogan = () => {
  const { data, isLoading, isFetching } = useGetSongsQuery("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("data", data?.data);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.container}>
        {data?.data?.map(
          (e: {
            id: number;
            is_english: number;
            video_url: string;
            title: string;
          }) => {
            return (
              <div key={e.id}>
                <h3
                  style={{ textAlign: e.is_english === 1 ? "left" : "right" }}
                >
                  {e?.title}
                </h3>
                <div>
                  <iframe
                    width="100%"
                    height="315"
                    src={e.video_url}
                    title={e.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default Slogan;
