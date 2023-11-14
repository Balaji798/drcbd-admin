import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [orderStatus, settOrderStatus] = useState("");

  useEffect(() => {
    const getProductDetail = async () => {
      const res = await axios.get(
        `https://drcbd-backend.onrender.com/orders/get_order_detail_by_id/${orderId}`
      );
      //console.log(res.data);
      setOrderData(res.data);
      settOrderStatus(res.data.adminStatus);
    };
    getProductDetail();
  }, []);

  const changeOrderStatus = async () => {
    try {
      const res = await axios.post(
        `https://drcbd-backend.onrender.com/orders/update_order_by_admin/${orderId}`,
        { status: orderStatus }
      );
    } catch (err) {
      console.log(err);
    }
  };

  console.log(orderStatus);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
        }}
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
                  alt={item?.productId?.images[0]}
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
            Order Placed Date:- {orderData?.orderTime.split("T")[0]} Order
            Time:-
            {orderData?.orderTime.split("T")[1].split("Z")[0]}
          </h3>
        </div>
        <div style={{paddingLeft:"1rem"}}>
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
      <h4 style={{ padding: "0.5rem 0" }}>Order Status :-</h4>
      <div
        style={{
          paddingBottom: "1rem",
          display: "flex",
          width: "25rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius:"5px",
            marginBottom:"0.5rem",
            width:"11rem"
          }}
        >
          <input
            type="checkbox"
            checked={
              orderData?.status === "placed" || orderData?.status === "delivered"
            }
            style={{
              width: "25px",
              margin: "0 0.3rem 0 0.7rem",
              height: "25px",
            }}
          />
          Order Placed
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius:"5px",
            margin:"0 0 0.5rem 1.5rem",
            width:"11rem"
          }}
        >
          <input
            type="checkbox"
            checked={
              orderData?.status === "placed" || orderData?.status === "delivered"
            }
            style={{
              width: "25px",
              margin: "0 0.3rem 0 0.7rem",
              height: "25px",
            }}
          />
          Payment Done
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius:"5px",
            width:"11rem",
            marginBottom:"0.5rem",
          }}
        >
          <input
            type="checkbox"
            checked={
              orderStatus === "out delivery" || orderStatus === "delivered"
            }
            onChange={(e) => {
              if (orderStatus === "out delivery") {
                settOrderStatus("placed");
              } else settOrderStatus("out delivery");
            }}
            style={{
              width: "25px",
              margin: "0 0.3rem 0 0.7rem",
              height: "25px",
            }}
          />
          Out For Delivery
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius:"5px",
            marginLeft:"1.5rem",
            width:"11rem",
            marginBottom:"0.5rem",
          }}
        >
          <input
            type="checkbox"
            checked={orderStatus === "delivered"}
            onChange={(e) => {
              if (orderStatus === "delivered") {
                settOrderStatus("");
              } else settOrderStatus("delivered");
            }}
            style={{
              width: "25px",
              margin: "0 0.3rem 0 0.7rem",
              height: "25px",
            }}
          />
          Order Delivered
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius:"5px",
            width:"11rem"
          }}
        >
          <input
            type="checkbox"
            checked={
              orderData?.adminStatus === "cancelled" ||
              orderStatus === "cancelled"
            }
            onChange={(e) => {
              if (orderStatus === "cancelled") {
                settOrderStatus("");
              } else settOrderStatus("cancelled");
            }}
            style={{
              width: "25px",
              margin: "0 0.3rem 0 0.7rem",
              height: "25px",
            }}
          />
          Order Cancelled
        </div>
      </div>
      <button
        className="button"
        style={{ margin: "0.5rem 0 2rem 0" }}
        onClick={changeOrderStatus}
      >
        Save Changes
      </button>
    </>
  );
};

export default OrderDetail;
