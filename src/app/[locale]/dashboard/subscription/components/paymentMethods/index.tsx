import React from "react";
import styles from "../../payment/style.module.scss";
import { EwalletIcon, MasterIcon, VisaIcon } from "@/shared/icons";
import Image from "next/image";
import { Grid, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import allVisa from "../../../../../../assets/subcription/cash icons 3.jpg";
const PaymentMethods = ({
  handlClickRadio,
  payType,
  cardPay,
  selected,
  setSelected,
  checkOut,
  walletPay,
  seletedPayment,
  loading,
  walletData,
  handleChangeWallet,
  isArabic,
}: any) => {
  const t = useTranslations("dashboardSubscriptionPayment");

  return (
    <div className={styles.lastDiv}>
      <div
        className={styles.cutomeRadio}
        onClick={() => {
          handlClickRadio("1");
        }}
      >
        <div className={styles.leftSide}>
          <div className={styles.icon}>
            {/* <VisaIcon /> */}
            {/* <MasterIcon /> */}
            <Image
              src={allVisa}
              alt="visa"
              sizes="100vw"
              style={{
                width: "35%",
                height: "auto",
              }}
            ></Image>
          </div>
          {/* <p> {t("visa")} </p> */}
        </div>
        <div className={styles.rightSide}>
          <input
            type="radio"
            name="radio"
            checked={payType == "1" ? true : false}
          />
          <span className="checkmark"></span>
        </div>
      </div>
      {payType === "1" && (
        <>
          <nav>
            <ul>
              {cardPay?.map((item: any) => {
                return (
                  <li
                    key={item?.id}
                    onClick={() => {
                      setSelected(item?.id);
                    }}
                    className={selected == item?.id ? `${styles.select}` : ""}
                    value={selected}
                  >
                    <Image
                      src={item?.media?.file_path}
                      width="700"
                      height="700"
                      alt={item?.title}
                    ></Image>
                    <p>{`${item?.title} ${
                      isArabic ? (item?.id == "2" ? "بطاقة بنكية" : "") : ""
                    } ${
                      isArabic ? (item?.id == "3" ? " محفظة كاش" : "") : ""
                    }`}</p>
                  </li>
                );
              })}
            </ul>
          </nav>
          {selected ? (
            <button
              onClick={checkOut}
              value={selected}
              disabled={loading ? true : false}
            >
              {t("payment")}
            </button>
          ) : (
            <p>Select payment method</p>
          )}
        </>
      )}
      {/* <div
        className={styles.cutomeRadio}
        onClick={() => {
          handlClickRadio("2");
        }}
      >
        <div className={styles.leftSide}>
          <EwalletIcon />
          <p>{t("wallet")} </p>
        </div>
        <div className={styles.rightSide}>
          <input
            type="radio"
            name="radio"
            checked={payType == "2" ? true : false}
          />
          <span className="checkmark"></span>
        </div>
      </div> */}

      {/* {payType == "2" && (
        <>
          {walletPay?.map((wallet: any) => {
            return (
              <>
                {wallet?.use !== false ? (
                  <>
                    <div
                      className={`${styles.singleWallet} ${
                        wallet?.id == selected ? styles.selected : ""
                      }`}
                      key={wallet?.id}
                      onClick={() => {
                        setSelected(wallet?.id);
                      }}
                    >
                      <div className={styles.leftSide}>
                        <Image
                          src={wallet?.media?.file_path}
                          alt="wallet"
                          width={80}
                          height={80}
                          style={{ width: "80", height: "auto" }}
                        ></Image>
                        <p>
                          E-wallet {wallet?.title} with :
                          <span style={{ fontWeight: "700", fontSize: "1rem" }}>
                            ({wallet?.phone})
                          </span>
                        </p>
                      </div>
                      <div className={`${styles.rightSide}`}></div>
                    </div>
                  </>
                ) : (
                  <h4 style={{ textAlign: "center", padding: "1rem 0" }}>
                    Your purchase process is pending for
                    <span style={{ color: "red", padding: "0 5px" }}>
                      {wallet?.title}
                    </span>
                  </h4>
                )}
              </>
            );
          })}
          {payType == "2" && (
            <>
              {seletedPayment?.id == 1 ||
                (seletedPayment?.id == 2 ? (
                  <></>
                ) : (
                  <>
                    {selected && (
                      <>
                        {" "}
                        <form onSubmit={checkOut}>
                          <Grid container columns={12} spacing={2}>
                            <Grid item xs={12}>
                              <label>{t("phone")}*</label>
                              <TextField
                                fullWidth
                                name="phone"
                                onChange={handleChangeWallet}
                                required
                                type="text"
                                value={walletData?.phone}
                                placeholder={t("phoneLabel")}
                              ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                              <label>{t("billImage")}*</label>

                              <TextField
                                fullWidth
                                name="bill_image"
                                onChange={handleChangeWallet}
                                // type="file"
                                required
                                type="file"
                                // value={walletData?.bill_image}
                              ></TextField>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            {seletedPayment?.id !== 1 &&
                              seletedPayment?.id !== 2 && (
                                <>
                                  <button
                                    value={selected}
                                    disabled={loading ? true : false}
                                    type="submit"
                                  >
                                    {loading
                                      ? `${t("payWithWallet")}...`
                                      : t("payWithWallet")}
                                  </button>
                                </>
                              )}
                          </Grid>
                        </form>
                      </>
                    )}
                  </>
                ))}
            </>
          )}
        </>
      )} */}
    </div>
  );
};

export default PaymentMethods;
