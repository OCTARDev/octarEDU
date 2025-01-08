"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("be0a53fc-65b1-4ff0-bd76-3e18801ca6cc");
  });

  return null;
};

export default CrispChat;
