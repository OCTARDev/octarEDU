"use client";
import React from "react";
import Header from "./components/header";
import Hero from "./components/hero";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { mainUrl } from "@/lib";
import Loader from "@/components/loader";

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
const MainPageActivity = () => {
  // const { id } = useParams(); // Assuming useParams is a valid hook
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = React.useState<any>();
  const [word, setWord] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const useData: auth = isAuthenticated();
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];

  const token: any = useData?.token || "";

  const header = {
    Authorization: `Bearer ${token}`,
  };
  React.useLayoutEffect(() => {
    const fetchApi = async () => {
      await setLoading(true);
      const data = await fetch(
        `${mainUrl}/coloring-activities/sub-activities/${id}`,
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
    fetchApi();
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Header data={data} lang={lang} />
      <Hero data={data} lang={lang} />
    </div>
  );
};

export default MainPageActivity;
