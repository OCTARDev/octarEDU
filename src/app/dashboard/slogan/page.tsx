import React from "react";
import styles from "./style.module.scss";
const Slogan = () => {
  return (
    <div className={styles.container}>
      <div className={styles.video}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/mtNY2JFllu4?si=DLAGXp66U7wfFqm6&autoplay=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Slogan;
