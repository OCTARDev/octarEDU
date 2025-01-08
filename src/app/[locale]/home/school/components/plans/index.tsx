import React from "react";
import styles from "./style.module.scss";
import { Grid } from "@mui/material";
const Plans = () => {
  return (
    <div>
      <div className={styles.plansContainer}>
        <Grid
          container
          columns={12}
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          {[1, 2, 3]?.map((e: any, i) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={i}>
                {" "}
                <div className={styles.SingleDiv}>
                  <div className={styles.header}>
                    <div>
                      {" "}
                      <h1>Package One</h1>
                      <h2>50 Seats</h2>
                    </div>

                    <h3>8000 EGP / Year</h3>
                  </div>
                  <div className={styles.list}>
                    <ul>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M9.54998 18.4996L3.84998 12.7996L5.27498 11.3746L9.54998 15.6496L18.725 6.47461L20.15 7.89961L9.54998 18.4996Z"
                            fill="black"
                          />
                        </svg>
                        <p> Access all available targets</p>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M9.54998 18.4996L3.84998 12.7996L5.27498 11.3746L9.54998 15.6496L18.725 6.47461L20.15 7.89961L9.54998 18.4996Z"
                            fill="black"
                          />
                        </svg>
                        <p> Control classes through our dashboard</p>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.btn}>
                    <button>Submit</button>
                  </div>
                  <div>
                    <p>Charged yearly</p>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Plans;
