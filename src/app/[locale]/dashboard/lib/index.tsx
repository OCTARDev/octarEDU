import { mainUrl } from "@/lib";
import axios from "axios";

export const isAuthenticated = () => {
  try {
    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("octar");
      return JSON.parse(userData);
    }
  } catch (e) {
    //console.log("Error", e);
  }
};
export type auth = {
  token?: string;
};

export const getIp = async () => {
  const data = await fetch("https://api.ipify.org/?format=json", {
    cache: "no-cache",
  }).then((response) => response.json());
  return data;
};

export const signOut = () => {
  if (typeof window !== "undefined") {
    // Code using localStorage
    // For example:
    localStorage.removeItem("octar");
  }
};

export const getSubscription = async (ip: string) => {
  const params = {
    user_ip: ip,
  };
  const queryParams = new URLSearchParams(params).toString();

  const data = await fetch(`${mainUrl}/subscription?${queryParams}`).then(
    (response) => response.json()
  );
  return data;
};

export const getCategory = async (id: string) => {
  const data = await fetch(`${mainUrl}/category-user/show-targets/${id}`).then(
    (response) => response.json()
  );
  return data;
};

export const getCategoryTarget = async (ip: string) => {
  const data = await fetch(`${mainUrl}/category-user`).then((response) =>
    response.json()
  );
  return data;
};
export const getSongs = async () => {
  const data = await fetch(`${mainUrl}/songs?lang=all`).then((response) =>
    response.json()
  );
  return data;
};

export const clickSubscription = async (paramss: any, lang: string) => {
  try {
    const useData: auth = isAuthenticated();
    const token: any = useData?.token || "";

    const header = {
      Authorization: `Bearer ${token}`,
      "X-App-Locale": lang,
      Accept: "application/json"
    };
    const { user_ip, subscription_id } = paramss;
    const params = {
      user_ip: user_ip,
      subscription_id: subscription_id,
    };
    const queryParams = new URLSearchParams(params).toString();

    const response = await fetch(
      `${mainUrl}/subscription/click-subscription?${queryParams}`,
      { headers: header }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to click subscription");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Unknown error");
  }
};

export const checkOutPayPal = async (dataa: any) => {
  const useData: auth = isAuthenticated();

  const token: any = useData?.token || "";

  const header = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
  // const data = await fetch(`${mainUrl}/paypal/check-out`, {
  //   method: "Post",
  //   body: body,
  //   headers: header,
  // }).then((response) => response.json());
  const data = await axios.post(
    `${mainUrl}/paypal/check-out`,
    {
      ...dataa,
    },
    {
      headers: header,
    }
  );

  return data;
};
