import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import axios from "axios";
import DeliveryAddress from "../../components/deliveryAddress/DeliveryAddress";
import ItemOrdered from "../../components/itemOrdered/ItemOrdered";

export default function User() {
  const location = useLocation();
  const [string, setString] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.post(
          "https://drcbd-backend.onrender.com/user/get-user-by-id",
          { userId: location.state.userId }
        );
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
  }, []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User Details</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowTitle">Full Name</span>
              <span className="userShowUsername">{user.fullName}</span>

              <span className="userShowTitle">Email</span>

              <span className="userShowUsername">{user.email}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <div className="userShowTitle">Total Purchases</div>
            <div className="userShowInfoTitle">฿ 20000</div>
            <div
              className="userShowInfoTitle"
              style={{ cursor: "pointer" }}
              onClick={() => setString("")}
            >
              Delivery Address
            </div>
            <div
              className="userShowInfoTitle"
              style={{ cursor: "pointer" }}
              onClick={() => setString("Item Ordered")}
            >
              Item Ordered
            </div>
            <div className="userShowInfo"></div>
          </div>
        </div>
        <div className="userUpdate">
          {string === "Item Ordered" ? (
            <ItemOrdered />
          ) : (
            <DeliveryAddress addresses={user.addresses} />
          )}
        </div>
      </div>
    </div>
  );
}
