import React from "react";
import styles from "../../payment/style.module.scss";
import { EwalletIcon, MasterIcon, VisaIcon } from "@/shared/icons";
import Image from "next/image";
import { Grid, TextField } from "@mui/material";
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
}: any) => {
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
            <VisaIcon />
            <MasterIcon />
          </div>
          <p> Credit / Debit Card</p>
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
                    <p>{item?.title}</p>
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
              Go to payment page
            </button>
          ) : (
            <p>Select payment method</p>
          )}
        </>
      )}
      <div
        className={styles.cutomeRadio}
        onClick={() => {
          handlClickRadio("2");
        }}
      >
        <div className={styles.leftSide}>
          <EwalletIcon />
          <p> E-wallet</p>
        </div>
        <div className={styles.rightSide}>
          <input
            type="radio"
            name="radio"
            checked={payType == "2" ? true : false}
          />
          <span className="checkmark"></span>
        </div>
      </div>

      {payType == "2" && (
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
                        {/* <EwalletIcon /> */}
                        <Image
                          src={wallet?.media?.file_path}
                          alt="wallet"
                          width={80}
                          height={50}
                        ></Image>
                        <p>
                          E-wallet {wallet?.title} with :
                          <span style={{ fontWeight: "700", fontSize: "1rem" }}>
                            {" "}
                            ({wallet?.phone})
                          </span>
                        </p>
                      </div>
                      <div className={`${styles.rightSide}`}>
                        {/* <input type="radio" name="radio" /> */}
                        {/* <span className="checkmark"></span> */}
                      </div>
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
                              <label>Your Phone*</label>

                              <TextField
                                fullWidth
                                name="phone"
                                onChange={handleChangeWallet}
                                required
                                type="text"
                                value={walletData?.phone}
                                placeholder="The phone you used for payment"
                              ></TextField>
                            </Grid>
                            <Grid item xs={12}>
                              <label> Bill image*</label>

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
                                    {loading ? "Loading" : "Pay with wallet"}
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
      )}
    </div>
  );
};

export default PaymentMethods;
