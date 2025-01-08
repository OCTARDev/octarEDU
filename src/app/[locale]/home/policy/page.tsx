"use client";
import React from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
const Policy = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const t = useTranslations("privacyPolicy");
  const tN = useTranslations("termsOfService");

  return (
    <div className={`${styles.container} ${isArabic && "arabic"}`}>
      <div>
        <h1>{t("privacy")}</h1>
        <h2> {`${t("lastUpdated")}: [20-12-2023]`}</h2>
        <p>{t("introduction")} </p>
        <h3>{t("collect")}:</h3>
        <h3>{t("informationWeCollect.personalInformation.name")}:</h3>
        <p>{t("informationWeCollect.personalInformation.description")}</p>
        <h3>{t("informationWeCollect.usageData.name")}:</h3>
        <p>{t("informationWeCollect.usageData.description")}</p>
        <h3>{t("howWeUseYourInformation.name")}:</h3>
        <h3>{t("howWeUseYourInformation.serviceDelivery.name")}:</h3>
        <p>{t("howWeUseYourInformation.serviceDelivery.description")}</p>
        <h3>{t("howWeUseYourInformation.communication.name")}:</h3>
        <p>{t("howWeUseYourInformation.communication.description")}</p>
        <h3>{t("howWeUseYourInformation.analytics.name")}:</h3>
        <p>{t("howWeUseYourInformation.analytics.description")}</p>
        <h3>{t("dataSecurity.name")}:</h3>
        <p>{t("dataSecurity.description")}</p>
        <h3>{t("thirdPartyLinks.name")}:</h3>
        <p>{t("thirdPartyLinks.description")} </p>
        <h3>{t("yourChoices.name")}:</h3>
        <p>{t("yourChoices.description")}</p>
        <h3>{t("updatesToThisPolicy.name")}:</h3>
        <p>{t("updatesToThisPolicy.description")}</p>
      </div>
      <div>
        <h1>{tN("name")}</h1>
        <h2>{`${t("lastUpdated")}: [20-12-2023]`}</h2>
        <p>{tN("introduction")}</p>
        <h3>{tN("useOfWebsite.name")}:</h3>
        <p>{tN("useOfWebsite.description")}</p>
        <h3>{tN("intellectualProperty.name")}:</h3>
        <p>{tN("intellectualProperty.description")}</p>
        <h3>{tN("userContributions.name")}:</h3>
        <p>{tN("userContributions.description")}</p>
        <h3>{tN("limitationOfLiability.name")}:</h3>
        <p>{tN("limitationOfLiability.description")}</p>
        <h3>{tN("indemnification.name")}:</h3>
        <p>{tN("indemnification.description")}</p>
        <h3>{tN("termination.name")}:</h3>
        <p>{tN("termination.description")}</p>
        {/* <h3>{tN("governingLaw.name")}:</h3> */}
        {/* <p>{tN("termination.description")}</p> */}
        <h3>{tN("changesToTerms.name")}:</h3>
        <p>{tN("changesToTerms.description")}</p>
      </div>
    </div>
  );
};

export default Policy;
