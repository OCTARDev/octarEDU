"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import * as styles from "./style.module.scss";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
type feedType = {
  id: number;
  name: string;
  title: string;
  rate: string;
  content: string;
};
const Feedback = ({ data, isArabic }: any) => {
  const container: any = styles;
  let feedBack = data?.data?.satisfied_customers;
  const t = useTranslations("Homepage.feedBack");

  return (
    <div className={`${container.feedBackContainer}`}>
      <div className={container.firstDiv}>
        <p>{t("TESTIMONIALS")}</p>
        <h1>{t("customerSay")}</h1>
      </div>
      <div className={container.slider}>
        <Swiper
          //   slidesPerView={3}
          spaceBetween={30}
          //   pagination={{
          //     clickable: true,
          //   }}
          navigation={{
            nextEl: "#main-slider__swiper-button-next",
            prevEl: " #main-slider__swiper-button-prev",
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Navigation, Pagination, Autoplay]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {feedBack?.map((e: feedType, i: number) => {
            return (
              <SwiperSlide key={e?.id}>
                <div className={container.singleDiv}>
                  <div>
                    {[1, 2, 3, 4, 5].map((e, i) => {
                      return (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z"
                            fill="url(#paint0_linear_420_10823)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_420_10823"
                              x1="2"
                              y1="3"
                              x2="20.975"
                              y2="22.9737"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#4E5AE2" />
                              <stop offset="0.541667" stop-color="#9E32A4" />
                              <stop offset="1" stop-color="#D552D8" />
                            </linearGradient>
                          </defs>
                        </svg>
                      );
                    })}
                  </div>
                  <div>
                    <p>{e?.content}</p>
                  </div>
                  <div>
                    <p>{e?.name}</p>
                    <p>{e?.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* <div className={container.mainSliderNav}>
          <div
            className={container.swiperButtonPrev}
            id="main-slider__swiper-button-prev"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
              >
                <path
                  d="M37.3332 47.0776L22.2563 32.0007L37.3332 16.9238L40.1434 19.734L27.8767 32.0007L40.1434 44.2674L37.3332 47.0776Z"
                  fill="black"
                />
              </svg>{" "}
            </span>
          </div>
          <div
            className={container.swiperButtonNext}
            id="main-slider__swiper-button-next"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="63"
                height="64"
                viewBox="0 0 63 64"
                fill="none"
              >
                <path
                  d="M26.6668 16.9244L41.7437 32.0013L26.6668 47.0781L23.8566 44.2679L36.1232 32.0013L23.8566 19.7346L26.6668 16.9244Z"
                  fill="black"
                />
              </svg>{" "}
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Feedback;
