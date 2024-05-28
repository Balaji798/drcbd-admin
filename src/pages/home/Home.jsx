import Chart from "../../components/chart/Chart";
import { useState, useEffect } from "react";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()
  const [totalUser, setTotalUser] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [monthUser, setMontUser] = useState([]);
  const [monthSales, setMonthSales] = useState([]);
  const user = localStorage.getItem("adminToken");
  useEffect(()=>{
   if(!user){
    navigate("/login")
   }
  },[])
  useEffect(() => {
    const getUsers = async () => {
      const res = await ApiService.getUserList();
      const user = res.data.filter((item) => {
        const objDate = new Date(item.createdAt);
        const objYear = objDate.getFullYear();
        const objMonth = objDate.getMonth();
        return (
          objYear === new Date().getFullYear() &&
          objMonth === new Date().getMonth()
        );
      });
      setMontUser(user);
      setTotalUser(res?.data?.length);
      const sales = await ApiService.getOrders();
      const totalSales = await axios.get(
        "https://drcbd-backend-zgqu.onrender.com/orders/get_total_sales"
      );
      console.log(totalSales.status)
      if(totalSales.status === 403){
        navigate("/login")
       }
      setTotalSales(totalSales?.data[0]?.totalSales);
      const sale = sales?.data?.slice(-8)
      setMonthSales(sale);
    };
    getUsers();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo
        totalUser={totalUser}
        totalSales={totalSales}
        monthUser={monthUser}
        monthSales={monthSales}
      />
      {/* <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      /> */}
      <div className="homeWidgets">
        <WidgetSm monthUser={monthUser} />
        <WidgetLg monthSales={monthSales}/>
      </div>
    </div>
  );
}
