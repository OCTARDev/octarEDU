import React from "react";
import styles from "./style.module.scss";
const Header = () => {
  return (
    <div>
      <div className={styles.contactContainer}>
        <div className={styles.left}>
          <h1>Let’s get in touch</h1>
          <div className={styles.countries}>
            <div className={styles.firstRow}>
              <div className={styles.singleCountry}>
                <h1>Egypt</h1>
                <p>2836 White Mountain</p>
                <p>CARE@ADGROUP.TECH</p>
                <p>+20 226309636</p>
              </div>
              <div className={styles.singleCountry}>
                <h1>Egypt</h1>
                <p>2836 White Mountain</p>
                <p>CARE@ADGROUP.TECH</p>
                <p>+20 226309636</p>
              </div>
              <div className={styles.singleCountry}>
                <h1>Egypt</h1>
                <p>2836 White Mountain</p>
                <p>CARE@ADGROUP.TECH</p>
                <p>+20 226309636</p>
              </div>
              <div className={styles.singleCountry}>
                <h1>Egypt</h1>
                <p>2836 White Mountain</p>
                <p>CARE@ADGROUP.TECH</p>
                <p>+20 226309636</p>
              </div>
            </div>
            <div className={styles.firstRow}>
              <div className={styles.singleCountry}>
                <h1>Egypt</h1>
                <p>2836 White Mountain</p>
                <p>CARE@ADGROUP.TECH</p>
                <p>+20 226309636</p>
              </div>
              <div className={styles.singleCountry}>
                <h1>United kingdom</h1>
                <p>Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
