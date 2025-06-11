"use client";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";
import logo from "../../assets/slidingPane/Logo_white.svg";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import useInViewAnimationRepeat from "@/animation/useScrollRepeat";
import { user } from "@/types";
import { signOut } from "@/app/[locale]/dashboard/lib";
import { useRouter } from "next/navigation";
import SiwtchingForms from "../switchForms";
import { logOut } from "@/redux/reducers/auth/authSlice";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
type props = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  firstLink: string;
};

export const navList = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.07,
    },
  },
};
export const navItem = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
};
const SlidingPane: React.FC<props> = ({ open, setOpen, firstLink }: props) => {
  const pathname = usePathname();
  const { push } = useRouter();

  const [openSingIn, setOpenSingIn] = React.useState<boolean>(false);
  const handlChange = () => {
    setOpenSingIn(!openSingIn);
  };
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
  const dispatch = useDispatch();

  const [openOptions, setOpenOptions] = React.useState<boolean>(false);
  const { ref, controls } = useInViewAnimationRepeat();
  const handlClose = () => {
    setOpen?.(false);
    //console.log("clicked");
  };

  React.useLayoutEffect(() => {
    if (pathname) handlClose();
  }, [pathname]);

  const [openAccordtion, setOpenAccordition] = React.useState<boolean>(false);
  const [openAccordtionSecond, setOpenAccorditionSecond] =
    React.useState<boolean>(false);
  const [openAccordtionThird, setOpenAccorditionThird] =
    React.useState<boolean>(false);

  const hanldeChange = () => {
    return setOpenAccordition(!openAccordtion);
  };
  const hanldeChangeSecond = () => {
    return setOpenAccorditionSecond(!openAccordtionSecond);
  };
  const hanldeChangeThird = () => {
    return setOpenAccorditionThird(!openAccordtionThird);
  };
  const signOutNow = async () => {
    try {
      await signOut();
      await setIsLogged(false);
      await dispatch(logOut());
      // await push("/home");
      //console.log("Func");
    } catch (e) {}
  };

  const isArabic = pathname.includes("/ar");
  const t = useTranslations("header");
  const tN = useTranslations("navBar");
  const lastPathName = pathname.split("/");
  let lastLink = lastPathName.slice(2, -1).join("/");
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const searchSingle = searchParams.get("single");
  return (
    <>
      <div
        className={
          open
            ? `${styles.slidignOutterContainer}  ${styles.show}`
            : `${styles.slidignOutterContainer} ${isArabic && "arabic"}`
        }
      >
        <div className={`${styles.heading} ${isArabic && "arabic"}`}>
          <ul className={`${isArabic && "arabic"}`}>
            <li className={styles.liFont}>
              <Image src={logo} alt="logo"></Image>
            </li>
            <li className={styles.liFont}>
              <button onClick={handlClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                    fill="white"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div className={`${styles.Sliding_content} ${isArabic && "arabic"}`}>
          <motion.ul
            ref={ref}
            variants={navList}
            initial="hidden"
            animate={controls}
            exit="hidden"
            // transition={{ duration: 5 }}
          >
            <motion.li
              className={pathname.includes("/ar") ? ` ${styles.active}` : ""}
            >
              <Link
                href={`/ar/${lastLink}${search ? `/?id=${search}` : ""}${
                  searchSingle ? `/?single=${searchSingle}` : ""
                }`}
              >
                ع
              </Link>
            </motion.li>
            <motion.li
              className={pathname.includes("/en") ? ` ${styles.active}` : ""}
            >
              <Link
                href={`/en/${lastLink}${search ? `/?id=${search}` : ""}${
                  searchSingle ? `/?single=${searchSingle}` : ""
                }`}
              >
                EN
              </Link>
            </motion.li>
            <motion.li
              variants={navItem}
              transition={{ duration: 2, delay: 3 }}
              className={styles.liFont}
            >
              <Link href={`/${firstLink}/home/`}>{tN("home")}</Link>
            </motion.li>
            <motion.li
              variants={navItem}
              transition={{ duration: 2, delay: 3 }}
              className={styles.liFont}
            >
              <Link href={`/${firstLink}/home/about`}> {tN("aboutUs")}</Link>
            </motion.li>
            <motion.li variants={navItem} className={styles.liFont}>
              <div className={styles.special} onClick={hanldeChange}>
                <p> {tN("services")}</p>
                <button>
                  {openAccordtion ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M17.6538 10.9018L12 16.5557L6.34619 10.9018L7.40002 9.84801L12 14.448L16.6 9.84801L17.6538 10.9018Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M6.34616 14.9009L12 9.24707L17.6538 14.9009L16.6 15.9547L12 11.3547L7.39998 15.9547L6.34616 14.9009Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </motion.li>
            <div
              className={
                openAccordtion
                  ? `${styles.accodtion} ${styles.show}`
                  : `${styles.accodtion}`
              }
            >
              <Link href={`/${firstLink}/home/educational-service`}>
                <p> {tN("educational")}</p>
              </Link>
              {/* <p>Advertisements</p>
              <p>Events</p> */}
            </div>
            <motion.li variants={navItem} className={styles.liFont}>
              <div className={styles.special} onClick={hanldeChangeSecond}>
                <p>{tN("subscriptions")} </p>
                <button>
                  {openAccordtionSecond ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M17.6538 10.9018L12 16.5557L6.34619 10.9018L7.40002 9.84801L12 14.448L16.6 9.84801L17.6538 10.9018Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M6.34616 14.9009L12 9.24707L17.6538 14.9009L16.6 15.9547L12 11.3547L7.39998 15.9547L6.34616 14.9009Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </motion.li>
            <div
              className={
                openAccordtionSecond
                  ? `${styles.accodtion} ${styles.show}`
                  : `${styles.accodtion}`
              }
            >
              <Link href={`/${firstLink}/home/individual`}>
                <p>{tN("individual")}</p>
              </Link>
              <Link href={`/${firstLink}/home/school`}>
                <p>{tN("school")}</p>
              </Link>
            </div>
            <motion.li variants={navItem} className={styles.liFont}>
              <Link href={`/${firstLink}/home/contact-us`}>
                {tN("contactUs")}{" "}
              </Link>
            </motion.li>
            <motion.li variants={navItem} className={styles.liFont}>
              <Link href={`/${firstLink}/home/categories`}>
                {tN("coloringCategories")}
              </Link>
            </motion.li>
            <motion.li variants={navItem} className={styles.liFont}>
              <Link href={`/${firstLink}/home/blog`}>{t("blog")}</Link>
            </motion.li>
            <motion.li variants={navItem} className={styles.liFont}>
              {t("privacyAndTerms")}
            </motion.li>
            <motion.li variants={navItem} className={styles.liFont}>
              <Link href={`/${firstLink}/home/need-help`}>
                {t("supportAndFAQs")}
              </Link>
            </motion.li>
            <motion.li variants={navItem} className={styles.liFont}>
              <Link href={`/${firstLink}/home/store`}>{tN("store")} </Link>
            </motion.li>
            {isLogged ? (
              <>
                <motion.li variants={navItem} className={styles.liFont}>
                  <div className={styles.special} onClick={hanldeChangeThird}>
                    <p>{tN("profile")}</p>
                    <button>
                      {openAccordtionThird ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M17.6538 10.9018L12 16.5557L6.34619 10.9018L7.40002 9.84801L12 14.448L16.6 9.84801L17.6538 10.9018Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M6.34616 14.9009L12 9.24707L17.6538 14.9009L16.6 15.9547L12 11.3547L7.39998 15.9547L6.34616 14.9009Z"
                            fill="white"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.li>
                <div
                  className={
                    openAccordtionThird
                      ? `${styles.accodtion} ${styles.show}`
                      : `${styles.accodtion}`
                  }
                >
                  {/* <Link href="/home/individual">
                    <p>Profile setting</p>
                  </Link> */}
                  <Link href={`/${firstLink}/dashboard/home`}>
                    <p>{tN("dashboard")}</p>
                  </Link>
                </div>
              </>
            ) : null}
          </motion.ul>
        </div>
        {isLogged ? (
          <button className={styles.sing_in} onClick={signOutNow}>
            {tN("logout")}
          </button>
        ) : (
          //   <button className={styles.sing_in} onClick={handleChangeForm}>
          //   Sign in
          // </button>
          <Link href={`/${firstLink}/login`}>
            <button className={styles.sing_in}> {tN("signIn")}</button>
          </Link>
        )}
      </div>

      <div></div>
      <SiwtchingForms open={openForm} setOpen={setOpenForm}></SiwtchingForms>
      {/* <Login open={openForm} setOpen={setOpenForm}></Login> */}
    </>
  );
};

export default SlidingPane;
