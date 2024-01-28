import Chart from "../../components/chart/Chart";
import { useState, useEffect } from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";

export default function Home() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [monthUser,setMontUser] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(
        "https://drcbd-backend.onrender.com/user/get-users-list"
      );
      const user = res.data.filter(item=>{   const objDate = new Date(item.createdAt);
        const objYear = objDate.getFullYear();
        const objMonth = objDate.getMonth();
      console.log(objYear, new Date().getFullYear(), objMonth, new Date().getMonth())
        return objYear === new Date().getFullYear() && objMonth === new Date().getMonth();})
        console.log(user)
      setTotalUser(res?.data?.length);
      const sales = await axios.get(
        "https://drcbd-backend.onrender.com/orders/get_all_orders"
      );
      let price = 0
      sales.data.map((item) => {
        if (
          item?.items?.length > 0 &&
          item?.status[item?.status?.length - 1].orderStatus !== "pending"
        ) {
          price+= Number(item.totalPrice);
        }
      });
      console.log(price);
      setTotalSales(price);
    };
    getUsers();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo totalUser={totalUser} totalSales={totalSales}/>
      {/* <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      /> */}
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
