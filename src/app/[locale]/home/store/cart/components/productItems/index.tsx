import Image from "next/image";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import {
  useAddToCartMutation,
  useDeleteCartMutation,
  useUpdateCartMutation,
} from "@/redux/rtk/cart";
import Swal from "sweetalert2";

const ProductItem = ({ data, ip }: any) => {
  //console.log("datadata", data);
  const [updateCart, { data: cartData, isLoading: cartLoading }] =
    useUpdateCartMutation();
  const [deleteProduct, { isLoading: cartDeleting }] = useDeleteCartMutation();
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const [amount, setAmount] = useState<number>(data?.amount);

  const addToCartRequest = async () => {
    let sendData = {
      id: data?.id,
      body: { amount: amount },
    };
    //console.log("Send Data", sendData);
    try {
      await updateCart(sendData).unwrap();
    } catch (e: any) {
      Swal.fire({
        title: "Error",
        text: e?.data?.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  const handleAddAmount = () => {
    setAmount((preValue: number) => preValue + 1);
    setIsDataUpdated(true); // This will trigger the useEffect to send the API request
  };
  const handleMinusAmount = () => {
    setAmount((preValue: number) => preValue - 1);
    setIsDataUpdated(true); // This will trigger the useEffect to send the API request
  };

  useEffect(() => {
    if (isDataUpdated) {
      addToCartRequest();
    }
  }, [amount]);
  //console.log("amount", amount);
  return (
    <div className={styles.productItem}>
      <div className={styles.productDetails}>
        <Image
          src={data?.product?.single_media?.file_path}
          alt={data?.product?.title}
          className={styles.image}
          height={120}
          width={120}
          priority={false}
          // onLoadingComplete={(img) => //console.log(img.naturalWidth)}
        />
        <div className={styles.details}>
          <span className={styles.name}>{data?.product?.title}</span>
          <div className={styles.controls}>
            <button className={styles.button} onClick={handleMinusAmount}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <span className={styles.quantity}> {amount}</span>
            <button className={styles.button} onClick={handleAddAmount}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 12H19"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            {cartLoading && <>Updating...</>}
          </div>
        </div>
      </div>
      <div className={styles.priceDelete}>
        <span className={styles.price}>
          {data?.price} {data?.currency}
        </span>
        <button
          className={styles.deleteButton}
          onClick={() => deleteProduct(data?.id)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H5H21"
              stroke="#CC3229"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
              stroke="#CC3229"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 11V17"
              stroke="#CC3229"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 11V17"
              stroke="#CC3229"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
