"use client";
import Login from "../login";
import SignUp from "../signUp";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./style.module.scss";
import { Modal } from "@mui/material";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { mainUrl } from "@/lib";
import axios from "axios";
import { useRouter } from "next/navigation";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SiwtchingForms = ({ open, setOpen }: props) => {
  const [form, setForm] = React.useState<number>(1);
  const handleClose = () => setOpen(false);
  // //console.log("Form Selection", open);
  // //console.log("form", form);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {form === 1 ? (
          <Login open={open} setOpen={setOpen} setForm={setForm} />
        ) : (
          <SignUp open={open} setOpen={setOpen} setForm={setForm} />
        )}
      </Modal>
    </div>
  );
};

export default SiwtchingForms;
