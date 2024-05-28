import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./orderDetail.css";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const getProductDetail = async () => {
      const res = await axios.get(
        `https://drcbd-backend-zgqu.onrender.com/orders/get_order_detail_by_id/${orderId}`
      );
      console.log(res.data);
      setOrderData(res.data);
      setOrderStatus(res.data.status[res.data.status.length-1].orderStatus);
    };
    getProductDetail();
  }, []);

  const changeOrderStatus = async () => {
    try {
      const data = orderData.status.filter(item=> item.orderStatus === orderStatus)
      if(data.length ===1) {
        alert('Status already updated, change the status first')
        return
      }
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json", // Set the content type to JSON
        },
      };
      const res = await axios.post(
        `https://drcbd-backend-zgqu.onrender.com/orders/update_order_by_admin/${orderId}`,
        { status: orderStatus },
        config
      );
      if(res.data.status){
        navigate('/orders')
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2
        style={{
          color: "#004d4a",
          paddingBottom: "1rem",
          textTransform: "uppercase",
        }}
      >
        Order Id:-{orderData?._id}
      </h2>
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
                color: "#004d4a",
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
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    height: "100%",
                  }}
                />
              </div>
              <div style={{ padding: "0 1rem 1rem" }}>
                <h3 style={{ paddingBottom: "0.5rem" }}>
                  Product Name:- {item?.productId?.name}
                </h3>
                <h3>Product Id :-{item?.productId?._id}</h3>
                <h3 style={{ padding: "1rem 0" }}>
                  Total Quantity:- {item?.quantity}
                </h3>
                <h3 style={{ paddingBottom: "1rem" }}>
                  Actual Price:- ฿{item?.productId?.price}
                </h3>
                <h3>Total Price:- ฿{item?.productId?.price * item?.quantity}</h3>
              </div>
            </div>
          ))}
          <h3
            style={{
              color: "#004d4a",
              textTransform: "uppercase",
              padding: "5px 0",
            }}
          >
            Status :- {orderStatus}
          </h3>
          <h3 style={{ paddingBottom: "1rem" }}>
            Order Date:- {orderData?.createdAt?.split("T")[0]} Order Time:-
            {orderData?.createdAt?.split("T")[1]?.split("Z")[0]}
          </h3>
          <h3>
            Order Placed Date:- {orderData?.orderTime?.split("T")[0]} Order
            Time:-
            {orderData?.orderTime?.split("T")[1]?.split("Z")[0]}
          </h3>

          <h2
            style={{
              marginTop: "0.5rem",
              borderBottom: "2px solid",
              paddingTop: "0.5rem",
            }}
          >
            User Detail
          </h2>
          <h3>User Name:- {orderData?.userId?.fullName}</h3>
          <h2 style={{ padding: "1rem 0" }}> Contact Detail :-</h2>
          <h3>Email:- {orderData?.userId?.email}</h3>
          <h3>
            Phon :-{" "}
            {orderData?.userId?.mobileNumber
              ? orderData?.userId?.mobileNumber
              : "NA"}
          </h3>
        </div>
        <div style={{ paddingLeft: "1.5rem", width: "45%" }}>
          <div style={{ padding: "1rem" }} className="priceDetail">
            <h3>
              <span>Order Total Price</span>{" "}
              <span> ฿{orderData?.totalPrice}</span>
            </h3>
            <h3>
              <span>Actual Price</span>
              <span></span>
            </h3>
            <h3>
              <span>Selling Price</span>
              <span></span>
            </h3>
            <h3>
              <span>Shipping Fee</span>
              <span>฿{orderData?.totalDeliveryCharge}</span>
            </h3>
            <h3>
              <span>Voucher Discount</span>
              <span></span>
            </h3>

            <h3
              style={{
                padding: "0.5rem 0",
                color: "#264043",
                borderTop: "1px solid",
                borderBottom: "1px solid",
              }}
            >
              <span>Total Income</span> <span> ฿{orderData?.totalPrice+orderData?.totalDeliveryCharge}</span>
            </h3>
          </div>
          <div>
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
          <h3
            style={{
              color: "#004d4a",
              textTransform: "uppercase",
              padding: "5px 0",
            }}
          >
            Order Status :-
          </h3>
          <div
            style={{
              paddingBottom: "1rem",
              display: "flex",
              width: "25rem",
              flexWrap: "wrap",
            }}
          >
            <div className="inputStyle">
              <input
                type="checkbox"
                checked={
                  orderData?.status[0]?.orderStatus === "placed" ||
                  orderData?.status[4]?.orderStatus === "delivered"
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
              className="inputStyle"
              style={{
                margin: "0 0 0.5rem 1.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={
                  orderStatus === "out for delivery" || orderStatus==='delivered'
                }
                onChange={(e) => {
                  if(orderStatus==="failed"){
                    alert("Order status can't be changed because order is not placed");
                    return
                  }
                    if (orderStatus === "out for delivery") {
                      setOrderStatus("placed");
                    } else setOrderStatus("out for delivery");
                }}
                style={{
                  width: "25px",
                  margin: "0 0.3rem 0 0.7rem",
                  height: "25px",
                }}
              />
              Out For Delivery
            </div>
            <div className="inputStyle">
              <input
                type="checkbox"
                checked={
                  orderStatus === "delivered"
                }
                onChange={(e) => {
                  if(orderStatus==="failed"){
                    alert("Order status can't be changed because order is not placed");
                    return
                  }
                  if (orderStatus === "delivered") {
                    setOrderStatus("out for delivery");
                  } else setOrderStatus("delivered");
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
              className="inputStyle"
              style={{
                marginLeft: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={orderStatus === "cancelled"}
                onChange={(e) => {
                  if(orderStatus==="failed"){
                    alert("Order status can't be changed because order is not placed");
                    return
                  }
                  if (orderStatus === "cancelled") {
                    setOrderStatus("");
                  } else setOrderStatus("cancelled");
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
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
