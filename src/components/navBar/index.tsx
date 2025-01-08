"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import SlidingPane from "../slidingPane";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { upContainerVariant } from "@/animation";
import { usePathname } from "next/navigation";
import styles from "./style.module.scss";
import { user } from "@/types";
import { signOut } from "@/app/dashboard/lib";
import SiwtchingForms from "../switchForms";
import { useWindowSize } from "../widthSreen";
import { logOut } from "@/redux/reducers/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const NavBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const usssse: any = useSelector((state: any) => state?.auth);
  const { push } = useRouter();
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lastPathName = pathname.split("/");
  let firstLink = lastPathName[1];
  const t = useTranslations("header");
  const tN = useTranslations("navBar");
  const handleChange = () => {
    setOpen(!open);
  };
  const goToDashBoard = async () => {
    push("/dashboard");
  };
  const dispatch = useDispatch();

  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const handleChangeForm = () => {
    setOpenForm(!openForm);
  };
  const getTheUserData: user | any =
    typeof window !== "undefined" ? localStorage.getItem("octar") : false;
  const userData = JSON.parse(getTheUserData);
  const isLoggedWithToken = userData?.token ? true : false;

  const [isLogged, setIsLogged] = useState(false);

  useLayoutEffect(() => {
    if (isLoggedWithToken) {
      setIsLogged(true);
    }
    if (!isLoggedWithToken) {
      setIsLogged(false);
    }
  }, [isLoggedWithToken]);
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (width >= 1000) {
      setOpen(false);
    }
  }, [width]);

  const [openOptions, setOpenOptions] = React.useState<boolean>(false);
  const handlChange = () => {
    setOpenOptions(!openOptions);
  };

  const signOutNow = async () => {
    try {
      await signOut();
      await dispatch(logOut());
      await setIsLogged(false);
      await push(`/${firstLink}/home`);
      // await push("/home");
    } catch (e) {}
  };
  let lastLink = lastPathName.slice(2, -1).join("/");
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const searchSingle = searchParams.get("single");
  return (
    <>
      <motion.div
        variants={upContainerVariant}
        initial="hidden"
        animate="visible"
        className={`${styles.navContainer} `}
        transition={{ type: "tween", duration: 1, delay: 0.1 }}
      >
        <div className={styles.header}>
          <div>
            <span>Get in touch</span>
            <span>+20123456789</span>
          </div>
          <div>
            <ul>
              <li
                className={pathname.includes("/ar") ? ` ${styles.active}` : ""}
              >
                <Link
                  href={`/ar/${lastLink}${search ? `/?id=${search}` : ""}${
                    searchSingle ? `/?single=${searchSingle}` : ""
                  }`}
                >
                  ع
                </Link>
              </li>
              <li>/</li>
              <li
                className={pathname.includes("/en") ? ` ${styles.active}` : ""}
              >
                <Link
                  href={`/en/${lastLink}${search ? `/?id=${search}` : ""}${
                    searchSingle ? `/?single=${searchSingle}` : ""
                  }`}
                >
                  EN
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li
                className={
                  pathname.includes("/home/tutorial")
                    ? ` ${styles.firstActive}`
                    : ""
                }
              >
                <Link href={`/${firstLink}/home/tutorial`}>
                  {t("tutorial")}{" "}
                </Link>
              </li>
              <li
                className={
                  pathname.includes("/home/blog")
                    ? ` ${styles.firstActive}`
                    : ""
                }
              >
                <Link href={`/${firstLink}/home/blog`}>{t("blog")} </Link>
              </li>
              <li
                className={
                  pathname.includes("/home/policy")
                    ? ` ${styles.firstActive}`
                    : ""
                }
              >
                <Link href={`/${firstLink}/home/policy`}>
                  {t("privacyAndTerms")}
                </Link>
              </li>
              <li
                className={
                  pathname.includes("/home/need-help")
                    ? ` ${styles.firstActive}`
                    : ""
                }
              >
                <Link href={`/${firstLink}/home/need-help`}>
                  {t("supportAndFAQs")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <nav className={`${styles.nav} ${isArabic && "arabic"}`}>
            <div className={styles.firstDivNav}>
              <Link href={`/${firstLink}/home`}>
                <Image src={logo} alt="logo"></Image>
              </Link>
            </div>
            <div className={styles.secondDivNav}>
              <ul>
                <li
                  className={
                    pathname === `/${firstLink}/home/` ? `${styles.active}` : ""
                  }
                >
                  <Link href={`/${firstLink}/home`}>{tN("home")} </Link>
                </li>
                <li
                  className={
                    pathname.includes("about") ? ` ${styles.active}` : ""
                  }
                >
                  <Link href={`/${firstLink}/home/about`}>{tN("aboutUs")}</Link>
                </li>
                <li
                  className={`${styles.dropbtn} ${
                    pathname.includes("home/individual") ||
                    pathname.includes("home/school")
                      ? ` ${styles.active}`
                      : ""
                  } `}
                >
                  <span
                    className={
                      // pathname.includes("/home/individual") ||
                      // pathname.includes("/home/school")
                      //   ? `${styles.active} ${styles.dropbtn}`
                      //   :

                      `${styles.dropbtn}`
                    }
                  >
                    {tN("subscriptions")}
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                    >
                      <path
                        d="M11.6538 2.00047L6.00002 7.6543L0.346191 2.00047L1.40002 0.946646L6.00002 5.54665L10.6 0.946646L11.6538 2.00047Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <div className={styles.dropdown}>
                    <ul
                      className={`${styles["dropdown-content"]} ${
                        isArabic && styles["align-right"]
                      }`}
                    >
                      <li>
                        <Link href={`/${firstLink}/home/individual`}>
                          {tN("individual")}
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${firstLink}/home/school`}>
                          {tN("school")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className={`${styles.dropbtn} ${
                    pathname.includes("home/educational-service")
                      ? ` ${styles.active}`
                      : ""
                  } `}
                >
                  <span className={`${styles.dropbtn}`}>{tN("services")}</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                    >
                      <path
                        d="M11.6538 2.00047L6.00002 7.6543L0.346191 2.00047L1.40002 0.946646L6.00002 5.54665L10.6 0.946646L11.6538 2.00047Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <div className={styles.dropdown}>
                    <ul className={styles["dropdown-content"]}>
                      <Link href={`/${firstLink}/home/educational-service`}>
                        <li> {tN("educational")}</li>
                      </Link>
                      {/* <li>Advertisements</li>
                      <li>Events</li> */}
                    </ul>
                  </div>
                </li>
                <li
                  className={
                    pathname.includes("/home/contact-us")
                      ? ` ${styles.active}`
                      : ""
                  }
                >
                  <Link href={`/${firstLink}/home/contact-us`}>
                    {tN("contactUs")}
                  </Link>
                </li>
                <li
                  className={
                    pathname.includes("/store") ? `${styles.active}` : ""
                  }
                >
                  <Link href={`/${firstLink}/home/store`}> {tN("store")}</Link>
                </li>
                <li
                  className={`${styles.coloring} ${
                    pathname.includes("/home/categories")
                      ? `${styles.active}`
                      : ""
                  }`}
                >
                  <Link href={`/${firstLink}/home/categories`}>
                    {tN("coloringCategories")}
                  </Link>
                </li>
              </ul>
            </div>
            {isLogged ? (
              <div className={styles.btnContainer}>
                <ul>
                  <li className={`${styles.dropbtn}`}>
                    <button className={styles.profileBtn} onClick={handlChange}>
                      <span
                        className={
                          pathname.includes("/home/individual") ||
                          pathname.includes("/home/school")
                            ? `${styles.active} ${styles.dropbtn}`
                            : `${styles.dropbtn}`
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M3.85 15.1C4.7 14.45 5.65 13.9375 6.7 13.5625C7.75 13.1875 8.85 13 10 13C11.15 13 12.25 13.1875 13.3 13.5625C14.35 13.9375 15.3 14.45 16.15 15.1C16.7333 14.4167 17.1875 13.6417 17.5125 12.775C17.8375 11.9083 18 10.9833 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 10.9833 2.1625 11.9083 2.4875 12.775C2.8125 13.6417 3.26667 14.4167 3.85 15.1ZM10 11C9.01667 11 8.1875 10.6625 7.5125 9.9875C6.8375 9.3125 6.5 8.48333 6.5 7.5C6.5 6.51667 6.8375 5.6875 7.5125 5.0125C8.1875 4.3375 9.01667 4 10 4C10.9833 4 11.8125 4.3375 12.4875 5.0125C13.1625 5.6875 13.5 6.51667 13.5 7.5C13.5 8.48333 13.1625 9.3125 12.4875 9.9875C11.8125 10.6625 10.9833 11 10 11ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C10.8833 18 11.7167 17.8708 12.5 17.6125C13.2833 17.3542 14 16.9833 14.65 16.5C14 16.0167 13.2833 15.6458 12.5 15.3875C11.7167 15.1292 10.8833 15 10 15C9.11667 15 8.28333 15.1292 7.5 15.3875C6.71667 15.6458 6 16.0167 5.35 16.5C6 16.9833 6.71667 17.3542 7.5 17.6125C8.28333 17.8708 9.11667 18 10 18ZM10 9C10.4333 9 10.7917 8.85833 11.075 8.575C11.3583 8.29167 11.5 7.93333 11.5 7.5C11.5 7.06667 11.3583 6.70833 11.075 6.425C10.7917 6.14167 10.4333 6 10 6C9.56667 6 9.20833 6.14167 8.925 6.425C8.64167 6.70833 8.5 7.06667 8.5 7.5C8.5 7.93333 8.64167 8.29167 8.925 8.575C9.20833 8.85833 9.56667 9 10 9Z"
                            fill="black"
                          />
                        </svg>
                        {tN("profile")}
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                        >
                          <path
                            d="M11.6538 2.00047L6.00002 7.6543L0.346191 2.00047L1.40002 0.946646L6.00002 5.54665L10.6 0.946646L11.6538 2.00047Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                    </button>
                    <div className={styles.dropdown}>
                      <ul
                        className={
                          openOptions
                            ? `${styles["dropdown-content"]} ${styles.open}`
                            : `${styles["dropdown-content"]}`
                        }
                      >
                        {/* <li>
                          <Link href="">Profile setting </Link>
                        </li> */}
                        <li>
                          <Link href={`/${firstLink}/dashboard/home`}>
                            {tN("dashboard")}
                          </Link>
                        </li>
                        <li>
                          <button
                            id="logOut"
                            className={styles.logOut}
                            onClick={signOutNow}
                          >
                            {tN("logout")}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div className={styles.ThirdDivNav}>
                {/* <button onClick={handleChangeForm}>Sign in</button> */}
                <Link href={`/${firstLink}/login`}>
                  <button>{tN("signIn")}</button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </motion.div>

      <div className={styles.slidingNav}>
        <nav>
          <ul>
            <li>
              <Link href={`/${firstLink}/home/`}>
                <Image src={logo} alt="logo"></Image>
              </Link>
            </li>
            <li>
              <button onClick={handleChange}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3.50003 17.6344V16.1345H20.5V17.6344H3.50003ZM3.50003 12.7498V11.2499H20.5V12.7498H3.50003ZM3.50003 7.86521V6.36523H20.5V7.86521H3.50003Z"
                    fill="black"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <SlidingPane open={open} setOpen={setOpen} firstLink={firstLink} />
      <SiwtchingForms open={openForm} setOpen={setOpenForm}></SiwtchingForms>
    </>
  );
};

export default NavBar;
