"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import img1 from "../../assets/how it works/1.png";
import img2 from "../../assets/how it works/2.png";
import img3 from "../../assets/how it works/3.png";
import img4 from "../../assets/how it works/4.png";
import { motion } from "framer-motion";
import { sowContainerVariant } from "@/animation";
import useInViewAnimation from "@/animation/useScroll";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
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
const HowItWorks = ({ data }: any) => {
  const { ref: refOne, controls: controlsOne } = useInViewAnimation();
  type dataType = { id: number; header: string; des: string; img: any }[];
  type singleDataType = { id: number; header: string; des: string; img: any };
  const t = useTranslations("Homepage.howItWorks");
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const dataArrE: dataType = [
    {
      id: 1,
      img: img1,
      header: "Download & Print",
      des: `Choose an OCTAR coloring activity and download it from the website or directly through the app, then print it and get ready to create.`,
    },
    {
      id: 2,
      img: img2,
      header: "Color",
      des: `Let your child choose their colors, use their imagination, and make every creation their own.`,
    },
    {
      id: 3,
      img: img3,
      header: "Scan with OCTAR",
      des: `Open the OCTAR app and scan the colored page to watch your child’s creation come to life in 3D.`,
    },
    {
      id: 4,
      img: img4,
      header: "Play & Learn",
      des: `Explore, interact, play, and learn as your child’s creation becomes part of a fun, interactive learning adventure.`,
    },
  ];
  const dataArrA: dataType = [
    {
      id: 1,
      img: img4,
      header: "حمّل واطبع",
      des: `اختر نشاط التلوين المناسب، وحمّله من موقع OCTAR أو مباشرة من التطبيق، ثم اطبعه واستعد لبدء التجربة.`,
    },
    {
      id: 2,
      img: img2,
      header: "لوّن وأبدع",
      des: `دع طفلك يختار ألوانه، ويطلق العنان لخياله، ويضيف لمسته الخاصة إلى كل رسمة.`,
    },
    {
      id: 3,
      img: img3,
      header: "امسح باستخدام OCTAR",
      des: `افتح تطبيق OCTAR وامسح الصفحة بعد تلوينها، ليشاهد طفلك إبداعه ينبض بالحياة أمامه بتقنية ثلاثية الأبعاد.`,
    },
    {
      id: 4,
      img: img1,
      header: "العب وتعلّم",
      des: `دع طفلك يستكشف ويتفاعل ويلعب ويتعلّم، بينما يتحول ما أبدعه إلى جزء من مغامرة تعليمية تفاعلية ممتعة.`,
    },
  ];
  let dataArr = isArabic ? dataArrA : dataArrE;
  const refs: any = useRef(dataArr.map(() => React.createRef()));

  const [hasAnimated, setHasAnimated] = useState(
    new Array(dataArr.length).fill(false)
  );

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
    <section style={{ margin: "0 3rem" }} className={`${isArabic && "arabic"}`}>
      <div className={styles.howContainer}>
        <motion.div
          variants={sowContainerVariant}
          initial="hidden"
          // transition={{ delay: 0.2 }}
          ref={refOne}
          animate={controlsOne}
        >
          <p>{t("process")}</p>
          <h1>{t("how")}</h1>
        </motion.div>
        <div className={`${styles.divContainer} pt-2`}>
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
                className={`${styles.singleDiv} `}
              >
                <Image src={e?.img} alt="how it works"></Image>
                <h1>{e.header}</h1>
                <h2 style={{ textAlign: isArabic ? "right" : "left" }}>
                  {e.des}
                </h2>
                {/* <p className={styles.num}>{++index}</p> */}
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
      </div>
    </section>
  );
};

export default HowItWorks;
