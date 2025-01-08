import axios from "axios";

export const mainUrl = "https://octarback.adgrouptech.com/api";

export const fetchHomePage = async () => {
  const data = await fetch(`${mainUrl}/home-page`, { cache: "no-store" }).then(
    (response) => response.json()
  );
  return data;
};

export const fetchAboutPage = async () => {
  const data = await fetch(`${mainUrl}/home-page/about`).then((response) =>
    response.json()
  );
  return data;
};

export const fetchHelpPage = async () => {
  const data = await fetch(`${mainUrl}/home-page/help`, {
    cache: "no-cache",
  }).then((response) => response.json());
  return data;
};

export const fetchContactUsPage = async () => {
  const data = await fetch(`${mainUrl}/home-page/contact-us`).then((response) =>
    response.json()
  );
  return data;
};

export const fetchCategoryPage = async () => {
  const data = await fetch(`${mainUrl}/category-page`).then((response) =>
    response.json()
  );
  return data;
};
export const fetchBlogPage = async (lang: any) => {
  const data = await fetch(`${mainUrl}/blogs`, {
    cache: "no-store",
    headers: {
      "X-App-Locale": lang,
    },
  }).then((response) => response.json());
  return data;
};
export const fetchSingleBlog = async (id: any) => {
  const data = await fetch(`${mainUrl}/blogs/show/${id}`, {
    cache: "no-store",
  }).then((response) => response.json());
  return data;
};
const getIp = async () => {
  const res = await axios.get("https://api.ipify.org/?format=json");
  // //console.log(res.data);
  // //console.log("testttttttttttttttttttt", res.data.ip);
  return res.data.ip;
};
export const fetchSubscriptionPage = async ({ account_type_id, ip }: any) => {
  const params = {
    user_ip: ip?.ip,
    account_type_id: account_type_id,
  };
  const queryParams = new URLSearchParams(params).toString();

  const data = await fetch(
    `${mainUrl}/home-page/show-subscription-plan?${queryParams}`,
    {
      cache: "no-store",
    }
  ).then((response) => response.json());
  return data;
};

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return response.json();
};
