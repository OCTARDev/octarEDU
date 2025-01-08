"use client";
import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./style.module.scss";
import whiteLogo from "../../assets/whiteLogo.png";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { color } from "framer-motion";

const Footer = () => {
  const t = useTranslations("footer");
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const isArabic = pathname.includes("/ar");
  return (
    <>
      <div className={`${styles?.footerContainer} ${isArabic && "arabic"}`}>
        <div className={styles?.firstColumn}>
          <Image src={whiteLogo} alt="logo"></Image>
          <div className={styles?.first}>
            <div>
              <p>{t("content.des")}</p>
              <div className={styles.social}>
                <a
                  href="https://www.facebook.com/octareducation"
                  target="_blank"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                      stroke="white"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
                <a href="https://www.instagram.com/octaredu/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 11.3703C16.1234 12.2025 15.9812 13.0525 15.5937 13.7993C15.2062 14.5461 14.5931 15.1517 13.8416 15.53C13.0901 15.9082 12.2384 16.0399 11.4077 15.9062C10.5771 15.7726 9.80971 15.3804 9.21479 14.7855C8.61987 14.1905 8.22768 13.4232 8.09402 12.5925C7.96035 11.7619 8.09202 10.9102 8.47028 10.1587C8.84854 9.40716 9.45414 8.79404 10.2009 8.40654C10.9477 8.01904 11.7977 7.87689 12.63 8.0003C13.4789 8.12619 14.2648 8.52176 14.8716 9.12861C15.4785 9.73545 15.8741 10.5214 16 11.3703Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.5 6.5H17.51"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
                <a href="https://twitter.com/OCTARedu" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18.205 2.25H21.513L14.286 10.51L22.788 21.75H16.13L10.916 14.933L4.94997 21.75H1.63997L9.36997 12.915L1.21497 2.25H8.03997L12.753 8.481L18.205 2.25ZM17.044 19.77H18.877L7.04497 4.126H5.07797L17.044 19.77Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/octar-edu/"
                  target="_blank"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                      stroke="white"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 9H2V21H6V9Z"
                      stroke="white"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                      stroke="white"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@octaredu" target="_blank">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.54 6.42C22.4212 5.94541 22.1792 5.51057 21.8386 5.15941C21.498 4.80824 21.0707 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.11996 4 3.39996 4.46C2.92921 4.59318 2.50194 4.84824 2.16131 5.19941C1.82068 5.55057 1.57875 5.98541 1.45996 6.46C1.14518 8.20556 0.991197 9.97631 0.999961 11.75C0.988741 13.537 1.14273 15.3213 1.45996 17.08C1.59092 17.5398 1.83827 17.9581 2.17811 18.2945C2.51794 18.6308 2.93878 18.8738 3.39996 19C5.11996 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0707 18.8668 21.498 18.6118 21.8386 18.2606C22.1792 17.9094 22.4212 17.4746 22.54 17C22.8523 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8572 8.1787 22.54 6.42Z"
                      stroke="white"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.75 15.0205L15.5 11.7505L9.75 8.48047V15.0205Z"
                      stroke="white"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@octaredu?lang=en"
                  target="_blank"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 6.75C19.8069 6.74876 18.663 6.27425 17.8194 5.43061C16.9757 4.58697 16.5012 3.44309 16.5 2.25C16.5 2.05109 16.421 1.86032 16.2803 1.71967C16.1397 1.57902 15.9489 1.5 15.75 1.5H12C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V14.625C11.2498 14.9605 11.1597 15.2898 10.9889 15.5786C10.8181 15.8674 10.5729 16.1051 10.279 16.2668C9.98501 16.4286 9.65304 16.5085 9.31768 16.4983C8.98232 16.488 8.65586 16.388 8.37234 16.2085C8.08883 16.0291 7.85865 15.7769 7.70582 15.4782C7.55299 15.1795 7.4831 14.8453 7.50345 14.5104C7.5238 14.1755 7.63364 13.8522 7.82151 13.5742C8.00939 13.2962 8.26841 13.0738 8.57156 12.93C8.6998 12.8691 8.80813 12.7731 8.88397 12.6532C8.95981 12.5332 9.00005 12.3941 9 12.2522V8.25C9.00005 8.14037 8.97606 8.03206 8.92972 7.9327C8.88339 7.83334 8.81584 7.74535 8.73182 7.67492C8.6478 7.60449 8.54937 7.55333 8.44345 7.52505C8.33752 7.49678 8.22669 7.49206 8.11875 7.51125C4.77281 8.1075 2.25 11.1656 2.25 14.625C2.25 16.5147 3.00067 18.3269 4.33686 19.6631C5.67306 20.9993 7.48533 21.75 9.375 21.75C11.2647 21.75 13.0769 20.9993 14.4131 19.6631C15.7493 18.3269 16.5 16.5147 16.5 14.625V10.9022C17.889 11.6269 19.4333 12.0036 21 12C21.1989 12 21.3897 11.921 21.5303 11.7803C21.671 11.6397 21.75 11.4489 21.75 11.25V7.5C21.75 7.30109 21.671 7.11032 21.5303 6.96967C21.3897 6.82902 21.1989 6.75 21 6.75ZM20.25 10.4662C18.7843 10.3364 17.3809 9.81329 16.1878 8.95219C16.0757 8.87156 15.9434 8.82347 15.8057 8.81321C15.668 8.80295 15.5301 8.83092 15.4072 8.89404C15.2844 8.95716 15.1814 9.05298 15.1095 9.17093C15.0376 9.28888 14.9997 9.42438 15 9.5625V14.625C15 16.1168 14.4074 17.5476 13.3525 18.6025C12.2976 19.6574 10.8668 20.25 9.375 20.25C7.88316 20.25 6.45242 19.6574 5.39752 18.6025C4.34263 17.5476 3.75 16.1168 3.75 14.625C3.75 12.1969 5.31 10.0191 7.5 9.225V11.8191C7.01517 12.143 6.62254 12.587 6.36037 13.1079C6.09821 13.6287 5.97545 14.2086 6.00407 14.7909C6.03268 15.3733 6.2117 15.9384 6.52366 16.431C6.83562 16.9236 7.26989 17.327 7.78414 17.6018C8.29839 17.8767 8.87508 18.0136 9.458 17.9993C10.0409 17.9849 10.6102 17.8198 11.1103 17.52C11.6104 17.2202 12.0243 16.796 12.3117 16.2886C12.599 15.7812 12.7501 15.2081 12.75 14.625V3H15.0469C15.2155 4.32101 15.818 5.54866 16.7597 6.49034C17.7013 7.43203 18.929 8.03446 20.25 8.20312V10.4662Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
              <div style={{ padding: "1rem 0" }}>
                <a
                  href="mailto:hello@adgrouptech.com"
                  target="_blank"
                  style={{ color: "white" }}
                >
                  hello@adgrouptech.com
                </a>
              </div>
              {/* <p>CONTACT US</p>
              <p>+201234567890</p>
              <p>octar@smarty.com</p> */}
            </div>
            {/* <div></div> */}
          </div>
        </div>
        <div className={styles?.secondColumn}>
          {/* <h5>IMPORTANT LINKS</h5> */}
          <div>
            <div>
              <ul>
                {/* <Link href="/home"> */}
                <li style={{ fontWeight: "bold", paddingBottom: "0.5rem" }}>
                  {t("content.links.quick.title")}
                </li>
                {/* </Link> */}
                <Link href={`/${lang}/home`}>
                  <li>{t("content.links.quick.home")} </li>
                </Link>
                <Link href={`/${lang}/home/about`}>
                  <li>{t("content.links.quick.about")} </li>
                </Link>
                <Link href={`/${lang}/home/blog`}>
                  <li> {t("content.links.quick.blogs")}</li>
                </Link>
                <Link href={`/${lang}/home/need-help`}>
                  <li>{t("content.links.quick.faqs")} </li>
                </Link>
              </ul>
            </div>
            <div>
              <ul>
                {/* <Link href="/home/blog"> */}
                <li style={{ fontWeight: "bold", paddingBottom: "0.5rem" }}>
                  {t("content.links.important.title")}
                </li>
                {/* </Link> */}
                <Link href={`/${lang}/home/policy`}>
                  <li>{t("content.links.important.privacy")}</li>
                </Link>
                <Link href={`/${lang}/home/need-help`}>
                  <li>{t("content.links.important.faqs")} </li>
                </Link>
                <Link href={`/${lang}/home/school`}>
                  <li>{t("content.links.important.schoolSubscription")} </li>
                </Link>
                <Link href={`/${lang}/home/individual`}>
                  <li>
                    {t("content.links.important.individaulSubscription")}{" "}
                  </li>
                </Link>
                <Link href={`/${lang}/home/educational-service`}>
                  <li>{t("content.links.important.educational")} </li>
                </Link>
              </ul>
            </div>
            <div>
              <ul>
                <li style={{ fontWeight: "bold", paddingBottom: "0.5rem" }}>
                  {t("content.sister_companies.title")}
                </li>
                <a target="_blank" href="https://adgrouptech.com">
                  <li>{t("content.sister_companies.adGroup")}</li>
                </a>
                <a target="_blank" href="https://smarty.adgrouptech.com/">
                  <li>{t("content.sister_companies.smarty")} </li>
                </a>
                <a target="_blank" href="https://vividly.adgrouptech.com/">
                  <li>{t("content.sister_companies.vividly")}</li>
                </a>
                <a target="_blank" href="https://vreal.adgrouptech.com/">
                  <li>{t("content.sister_companies.vreal")} </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles?.thirdColumn}>
          <h5>{t("content.newsletter_subscription.title")}</h5>
          <form>
            <label htmlFor="email">
              {t("content.newsletter_subscription.email")}
            </label>
            <input
              type="email"
              className={styles.email}
              placeholder={t("content.newsletter_subscription.prompt")}
              required
            />
            <button type="submit">
              {t("content.newsletter_subscription.send")}
            </button>
          </form>
          {/* <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
          </ul> */}
        </div>
      </div>
      <div className={styles?.copyRight}>
        Copyright ©2022 SMARTY. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
