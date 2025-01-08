import React from "react";
import styles from "./style.module.scss";
import video from "../../../../../assets/vdeoDash.png";
import Image from "next/image";
const Hero = () => {
  return (
    <div className={styles.divContainer}>
      <div className={styles.firstDiv}>
        <h1>How to user our dashboard?</h1>
        <ul>
          <li>Start by choosing a subscription plan</li>
          <li>Create a classroom</li>
          <li>Add students to the class manually or upload excel sheet</li>
          <li>
            Share QR Code and coloring packs with students to start learning and
            playing
          </li>
        </ul>
      </div>
      <div className={styles.secondDiv}>
        <h1>{`Don’t know how to use our dashboard yet?`}</h1>
        <h2>Watch a video tutorial explaining how.</h2>
        <div className={styles.video}>
          <Image src={video} alt="video"></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
