import React, { useEffect, useState } from "react";
import { productRows } from "../../dummyData";
import axios from "axios";

const ItemOrdered = ({ userId }) => {
  const [orderData,setOrderData]=useState([]);
  console.log(userId)
  useEffect(() => {
    const getUserOrders = async () => {
      const res = await axios.post(
        "https://drcbd-backend.onrender.com/orders/get_order",
        { userId: userId }
      );
      setOrderData(res.data);
    };
    getUserOrders();
  }, []);
  return (
    <div>
      {orderData[0]?.items?.map((item, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <img src={item.productId.images[0]} style={{ width: 100, objectFit: "cover" }} />
          <div>
            <h3>{item.productId.name}</h3>
            <h4>Price:- {item.productId.price}</h4>
            <h4>Quantity:- {item.quantity}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemOrdered;
