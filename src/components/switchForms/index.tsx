"use client";
import Login from "../login";
import SignUp from "../signUp";
import React from "react";
import { Modal } from "@mui/material";


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
        <div>
        {form === 1 ? (
          <Login open={open} setOpen={setOpen} setForm={setForm} />
        ) : (
          <SignUp open={open} setOpen={setOpen} setForm={setForm} />
        )}
        </div>
      </Modal>
    </div>
  );
};

export default SiwtchingForms;
