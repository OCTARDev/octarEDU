import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import img from "../../../../../../assets/blog/blog1.jpg";
import { blogsArr } from "../../../components/data";
const SingleBlogData = ({ id, data }: any) => {
  console.log(data);
  
  const singleBlog: any = data?.data;
  const paragraphArray = singleBlog?.blog_descriptions;
  //console.log("datadatadatadatadatadata", data?.data);
  return (
    <div className={styles.singleBlogDataContainer}>
      <div className={styles.content}>
        <div className={styles.date}>
          <Image
            src={singleBlog?.media?.file_path}
            alt="blog"
            width={700}
            height={700}
          ></Image>
          {/* <h1>September 21, 2022</h1> */}
          <h2>{singleBlog?.title}</h2>
        </div>
        <div>
          {paragraphArray?.map((pargraph: any) => {
            return (
              <div className={styles.singleParagraph} key={pargraph?.id}>
                <h3>{pargraph?.title} : </h3>
                <p>
                  {pargraph?.body?.includes("\n") ? (
                    <>
                      {pargraph?.body
                        ?.split("\n")
                        ?.map((list: any, index: number) => {
                          return (
                            <ul key={index}>
                              <li>{list}</li>
                            </ul>
                          );
                        })}
                    </>
                  ) : (
                    <>{pargraph?.body}</>
                  )}
                </p>
              </div>
            );
          })}
        </div>
        {/* <div>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div> */}
        {/* <div>
          Morbi lobortis at faucibus leo facilisis egestas ultrices pharetra
          commodo. Nullam diam id montes tempus dictum est nulla massa urna.
          Duis condimentum lacinia malesuada amet sit condimentum ac integer.
          Auctor etiam amet ac vitae. Pellentesque sollicitudin congue odio et
          quam amet aliquam tortor. Cursus faucibus dolor eget vitae massa mi.
          Vel ut aliquam aliquet vitae morbi et. Urna donec vitae purus orci
          ipsum penatibus porttitor penatibus nulla. Ipsum egestas vitae aliquet
          neque enim arcu. Lectus pretium mi augue varius posuere laoreet
          pulvinar venenatis hac. Vestibulum tincidunt ac quam laoreet cum urna.
        </div> */}
        {/* <div>
          <p>Author</p>
          <div className={styles.photo}>
            <p>From textbooks to Tyrannosaurs: Reimagine Learning with AR</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SingleBlogData;
