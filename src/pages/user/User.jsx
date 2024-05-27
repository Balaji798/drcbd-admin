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
          "https://drcbd-backend-zgqu.onrender.com/user/get-user-by-id",
          { userId: location?.state?.userId }
        );
        if(res.data){
          //const resData= await axios.get()
        }
        setUser(res.data);
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
            <div className="userShowTopTitle">
              <span className="userShowTitle">Full Name</span>
              <span className="userShowUsername">{user?.fullName}</span>
              <span className="userShowTitle">Email</span>
              <span className="userShowUsername">{user?.email}</span>
              <span className="userShowTitle">Phone</span>
              <span className="userShowUsername">{user?.phone}</span>
            </div>
          </div>
          
        </div>
        <div className="userUpdate">
            <DeliveryAddress addresses={user.userAddress} />
        </div>
      </div>
      <ItemOrdered userId={location?.state?.userId}/>
    </div>
  );
}
