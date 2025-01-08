import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import person from "../../../../../assets/team2.jpg";
const OurTeam = () => {
  return (
    <div>
      <div className={styles.ourTeamContainer}>
        <div className={styles.firstSection}>
          <h1>Meet our team</h1>
          <p>
            {/* Lorem ipsum dolor sit amet consectetur. Tristique ipsum purus odio
            fames viverra turpis. Eget malesuada vestibulum habitasse in nullam
            pellentesque. Eget aliquam eros tristique augue sem gravida eget. */}
          </p>
        </div>
        <div className={styles.secondSection}>
          {[1, 2, 3, 4, 5, 6]?.map((e, i) => {
            return (
              <div key={i} className={styles.singleDivTeam}>
                <div>
                  <Image src={person} alt="team"></Image>
                </div>
                <div className={styles.info}>
                  <div>
                    <p>CEO & Founder</p>
                  </div>
                  <div>
                    <p>Adham Khalifa</p>
                  </div>
                  <div>
                    <p>
                      {/* Lorem ipsum dolor sit amet consectetur. Tristique ipsum
                      purus odio fames viverra turpis. */}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
