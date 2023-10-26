import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const getProductDetail = async () => {
      const res = await axios.get(
        `https://drcbd-backend.onrender.com/orders/get_order_detail_by_id/${orderId}`
      );
      //console.log(res.data);
      setOrderData(res.data);
    };
    getProductDetail();
  }, []);
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", width: "80%" }}
    >
      <div>
        {orderData?.items?.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "1rem",
              display: "flex",
              color: "#264043",
              border: "1px solid",
              borderRadius: "5px",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                background: "#264043",
                width: "8em",
                height: "8em",
              }}
            >
              <img
                src={item?.productId?.images[0]}
                style={{ width: "100%", objectFit: "contain" }}
              />
            </div>
            <div style={{ padding: "0 1rem 1rem" }}>
              <h3>Product Name:- {item.productId.name}</h3>
              <h3 style={{ padding: "1rem 0" }}>
                Total Quantity:- {item.quantity}
              </h3>
              <h3 style={{ paddingBottom: "1rem" }}>
                Actual Price:- ฿{item.productId.price}
              </h3>
              <h3>Total Price:- ฿{item.productId.price * item.quantity}</h3>
            </div>
          </div>
        ))}
        <h3>Status :- {orderData?.status}</h3>
        <h3 style={{ padding: "1rem 0" }}>
          Order Total Price :- ฿{orderData?.totalPrice}
        </h3>
        <h3 style={{ paddingBottom: "1rem" }}>
          Order Date:- {orderData?.createdAt.split("T")[0]} Order Time:-
          {orderData?.createdAt.split("T")[1].split("Z")[0]}
        </h3>
        <h3>
          Order Placed Date:- {orderData?.orderTime.split("T")[0]} Order Time:-
          {orderData?.orderTime.split("T")[1].split("Z")[0]}
        </h3>
      </div>
      <div style={{padding: "1rem",}}>
        <h3>User Name:- {orderData?.userId?.fullName}</h3>
        <h2 style={{ padding: "1rem 0" }}> Contact Detail :-</h2>
        <h3>Email:- {orderData?.userId?.email}</h3>
        <h3>
          Phon :-{" "}
          {orderData?.userId?.mobileNumber
            ? orderData?.userId?.mobileNumber
            : "NA"}
        </h3>
        <h2 style={{ padding: "1rem 0" }}>Delivery Address :-</h2>
        <h3 style={{ padding: "1rem 0" }}>
          Contact Number :- {orderData?.deliveryAddress.contactNumber}
        </h3>
        <h3>Home:-{orderData?.deliveryAddress?.address}</h3>
        <h3 style={{ padding: "1rem 0" }}>
          City:- {orderData?.deliveryAddress.city}
        </h3>
        <h3>Postal Code :- {orderData?.deliveryAddress.postalCode}</h3>
        <h3 style={{ padding: "1rem 0" }}>
          Country :- {orderData?.deliveryAddress.country}
        </h3>
      </div>
    </div>
  );
};

export default OrderDetail;
