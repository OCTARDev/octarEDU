"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import img1 from "../../assets/how it works/Group 144.webp";
import img2 from "../../assets/how it works/Group 146.webp";
import img3 from "../../assets/how it works/Group 145.webp";
import img4 from "../../assets/how it works/Group 147.webp";
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
  const dataArrA: dataType = [
    {
      id: 1,
      img: img4,
      header: "تحميل الهدف (التارجت)",
      des: `قم بتحميل ملفاتنا الورقية ذات اللونين الأبيض والأسود و سواء كنت مدرسًا أو طالبًا أو والد يبحث عن نشاط ممتع  وفريد لأطفاله، فإن هذه الأهداف هي نقطة البداية لعالم من التفاعل الذكي اللامتناهي, كما يمكنك شراء كتب التلوين مع صفحات الانشطة من المتجر الخاص بنا.`,
    },
    {
      id: 2,
      img: img2,
      header: "التلوين",
      des: `أطلق العنان لإبداعك ولون الأهداف بأي لون تريده, حرر خيالك واجعل كل هدف لوحة للتعبير عن ذاتك.  `,
    },
    {
      id: 3,
      img: img3,
      header: "مسح رمز  QR ",
      des: `افتح تطبيق أوكتار  OCTARعلي هاتفك المحمول أو جهازك اللوحي لمسح رمز QR Code للأهداف التي لونتها وشاهد كيف تنبض الوانك ثنائية الأبعاد بالحياة كنماذج ثلاثية الأبعاد أمام عينيك مباشرةً.`,
    },
    {
      id: 4,
      img: img1,
      header: "تفاعل وألعب وتعلم",
      des: `اسبح في عالم جديد حيث تعلمك ينبع من اللعب والتفاعل، نماذج أوكتار OCTAR ثلاثية الأبعاد ليست مذهلة بصريًا فحسب؛ بل إنها أدوات تعليمية تجذب الانتباه وتسلي وتضئ دروب المعرفة. استكشف وتفاعل واكتشف عالم المعرفة بطريقة مليئة بالمغامرة والحماس.`,
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
                <h2 style={{ textAlign: isArabic ? "right" : "left" }}>
                  {e.des}
                </h2>
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
      </div>
    </section>
  );
};

export default HowItWorks;
