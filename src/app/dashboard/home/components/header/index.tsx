"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import img1 from "../../../../../assets/how it works/Group 144.webp";
import img2 from "../../../../../assets/how it works/Group 145.webp";
import img3 from "../../../../../assets/how it works/Group 146.webp";
import img4 from "../../../../../assets/how it works/Group 147.webp";
import HowItWorks from "@/components/howItWorks";
import { motion } from "framer-motion";
import { sowContainerVariant } from "@/animation";
import useInViewAnimation from "@/animation/useScroll";

const variants = {
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    // transition: {
    //   y: { stiffness: 1000, velocity: -100 },
    // },
  },
};
const Header = () => {
  type dataType = { id: number; header: string; des: string; img: any }[];
  type singleDataType = { id: number; header: string; des: string; img: any };
  const dataArr: dataType = [
    {
      id: 1,
      img: img4,
      header: "Download Targets",
      des: `Download our unique black and white paper targets. Whether you're
  a teacher, student, or a parent looking for an engaging activity
  for your children, these targets are the starting point for
  endless possibilities.`,
    },
    {
      id: 2,
      img: img2,
      header: "Color",
      des: `  Unleash your creativity and color the targets with any colors you
      desire. Let your imagination run wild and make each target your
      canvas for self-expression.`,
    },
    {
      id: 3,
      img: img3,
      header: "Scan with OCTAR",
      des: `Use your mobile or tablet to scan the colored targets AR Code with our OCTAR app. Watch in amazement as the 2D drawings spring to life as captivating 3D models right before your eyes`,
    },
    {
      id: 4,
      img: img1,
      header: "Interact and Learn",
      des: `Dive into a world where learning is play, and play is learning. OCTAR's 3D models are not just visually stunning; they're educational tools that engage, entertain, and enlighten. Explore, interact, and discover the world of knowledge in a way that feels like an adventure`,
    },
  ];
  const { ref: refOne, controls: controlsOne } = useInViewAnimation();

  const refs: any = useRef(dataArr.map(() => React.createRef()));

  const [hasAnimated, setHasAnimated] = useState(
    new Array(dataArr.length).fill(false)
  );

  //console.log("hasAnimated", hasAnimated);
  //console.log("refs", refs);
  useEffect(() => {
    // IntersectionObserver callback to check when elements enter or leave the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.findIndex(
            (ref: any) => ref.current === entry.target
          );
          if (index >= 0 && entry.isIntersecting && !hasAnimated[index]) {
            setHasAnimated((prev) => {
              const newHasAnimated = [...prev];
              newHasAnimated[index] = true;
              return newHasAnimated;
            });
          }
        });
      },
      {
        threshold: 0.5, // Adjust as needed to determine the sensitivity of the observer
      }
    );

    // Observe each ref
    refs.current.forEach((ref: any) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      // Clean up the observer when the component is unmounted
      refs.current.forEach((ref: any) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [hasAnimated]);
  return (
    <div>
      <div className={styles.header}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M4.5 20.9996V9.74967L12 4.10547L19.5 9.74967V20.9996H13.9038V14.3073H10.0961V20.9996H4.5Z"
            fill="#321433"
          />
        </svg>{" "}
        <h1>Welcome to OCTAR</h1>
      </div>
      <div className={styles.howItWorks}>
        <div className={styles.content}>
          {/* <div>
            <h1>Process</h1>
            <h2>How it works?</h2>
          </div>
          <div className={styles.photos}>
            <div>
              <Image src={img4} alt="how it works"></Image>
              <p>Download Targets</p>
              <p>
                {` Download our unique black and white paper targets. Whether you're
              a teacher, student, or a parent looking for an engaging activity
              for your children, these targets are the starting point for
              endless possibilities.`}
              </p>
            </div>
            <div>
              {" "}
              <Image src={img2} alt="how it works"></Image>
              <p>Color</p>
              <p>
                Unleash your creativity and color the targets with any colors
                you desire. Let your imagination run wild and make each target
                your canvas for self-expression.
              </p>
            </div>
            <div>
              {" "}
              <Image src={img3} alt="how it works"></Image>
              <p>Scan with OCTAR</p>
              <p>
                Use your mobile or tablet to scan the colored targets AR Code
                with our OCTAR app. Watch in amazement as the 2D drawings spring
                to life as captivating 3D models right before your eyes.
              </p>
            </div>
            <div>
              {" "}
              <Image src={img1} alt="how it works"></Image>
              <p>Interact and Learn</p>
              <p>
                {`Dive into a world where learning is play, and play is learning.
              OCTAR's 3D models are not just visually stunning; they're
              educational tools that engage, entertain, and enlighten.`}
              </p>
            </div>
          </div> */}
          <div className={styles.howContainer}>
            <motion.div
              variants={sowContainerVariant}
              initial="hidden"
              // transition={{ delay: 0.2 }}
              ref={refOne}
              animate={controlsOne}
            >
              <p>Process</p>
              <h1>How it works?</h1>
            </motion.div>
            <div className={styles.divContainer}>
              {dataArr?.map((e, index: number) => {
                return (
                  <motion.div
                    variants={variants}
                    initial="hidden"
                    transition={{ delay: index * 0.1 }}
                    ref={refs.current[index]}
                    // ref={refs.current[index]} // Attach ref to each element
                    animate={hasAnimated[index] ? "visible" : ""}
                    key={e.id}
                    className={styles.singleDiv}
                  >
                    <Image src={e?.img} alt="how it works"></Image>
                    <h1>{e.header}</h1>
                    <h2>{e.des}</h2>
                    <p className={styles.num}>{++index}</p>
                  </motion.div>
                );
              })}
              {/* <motion.div
            variants={variants}
            initial="hidden"
            transition={{ delay: 0.2 }}
            ref={refTwo}
            animate={controlsTwo}
          >
            <Image src={img4} alt="how it works"></Image>
            <h1>Download Targets</h1>
            <h2>
              {` Download our unique black and white paper targets. Whether you're
              a teacher, student, or a parent looking for an engaging activity
              for your children, these targets are the starting point for
              endless possibilities.`}
            </h2>
          </motion.div>
          <motion.div
            variants={variants}
            initial="hidden"
            transition={{ delay: 0.3 }}
            ref={refThree}
            animate={controlsThree}
          >
            <Image src={img2} alt="how it works"></Image>
            <h1>Color</h1>
            <h2>
              Unleash your creativity and color the targets with any colors you
              desire. Let your imagination run wild and make each target your
              canvas for self-expression.
            </h2>
          </motion.div>
          <motion.div
            variants={variants}
            initial="hidden"
            transition={{ delay: 0.4 }}
            ref={refFour}
            animate={controlsFour}
          >
            <Image src={img3} alt="how it works"></Image>
            <h1>Scan with OCTAR</h1>
            <h2>
              {`Use your mobile or tablet to scan the colored targets AR Code with our OCTAR app. Watch in amazement as the 2D drawings spring to life as captivating 3D models right before your eyes`}
            </h2>
          </motion.div>
          <motion.div
            variants={variants}
            initial="hidden"
            transition={{ delay: 0.5 }}
            ref={refFive}
            animate={controlsFive}
          >
            <Image src={img1} alt="how it works"></Image>
            <h1>Interact and Learn</h1>
            <h2>
              {`Dive into a world where learning is play, and play is learning. OCTAR's 3D models are not just visually stunning; they're educational tools that engage, entertain, and enlighten. Explore, interact, and discover the world of knowledge in a way that feels like an adventure`}
            </h2>
          </motion.div> */}
            </div>
            <motion.div className={styles.video}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/mtNY2JFllu4?si=LHDYrt7oLtrKsBdi?autoplay=1&controls=0&showinfo=0&modestbranding=1"
                title="YouTube Video"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Header;
