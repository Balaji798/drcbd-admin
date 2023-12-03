import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import SideBar from "./components/sidebar/Sidebar";
import OrderDetail from "./pages/orderDetail/OrderDetail";
import ProductList from "./pages/productList/ProductList";
import AddProduct from "./pages/addProduct/AddProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import UserList from "./pages/userList/UserList";
import CBDUniversity from "./pages/cbd-university/CBDUniversity";
import Sales from "./pages/sales/Sales";
//import Transaction from "./pages/transaction/Transaction";
import Reports from "./pages/reports/Reports";
import Feedback from "./pages/feedback/Feedback";
import Orders from "./pages/orders/Orders";
import AddBlog from "./pages/add-blog/AddBlog";
import TopSpender from "./pages/topSpender/TopSpender";
import User from "./pages/user/User";

function App() {
  return (
    <Router>
      {/* {user && <NavBar />}
     {user && <SideBar />} */}
      <Topbar />
      <SideBar />
      <div
        style={{
          // marginLeft:user && "14%",
          // padding:user && "100px 0 0 20px",
          // backgroundColor: "#f6f9fa",
          marginLeft: "14%",
          padding: "50px 0 0 20px",
          backgroundColor: "#f6f9fa",
        }}
      >
        <Routes>
          {/* {user && <Route path="/" element={<Dashboard />} />} */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path={"/edit-product/:productId"} element={<EditProduct />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/cbd-university" element={<CBDUniversity />} />
          <Route path="/sales" element={<Sales />} />
          {/* <Route path="/transaction" element={<Transaction />} />*/}
          <Route path="/report" element={<Reports />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/user-detail" element={<User />} />
          <Route path="/order-detail/:orderId" element={<OrderDetail />} />
          <Route path="/top_spender" exact element={<TopSpender />} />
          {/* <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React, { useEffect, useState } from "react";

// const data = {
//   USA: {
//     California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],

//     NewYork: ["New York City", "Buffalo", "Rochester", "Albany"],

//     Texas: ["Houston", "Dallas", "Austin", "San Antonio"],

//     Florida: ["Miami", "Orlando", "Tampa", "Jacksonville"],
//   },

//   India: {
//     Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],

//     Delhi: ["New Delhi", "Noida", "Gurgaon", "Faridabad"],

//     TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Trichy"],
//   },

//   Canada: {
//     Ontario: ["Toronto", "Ottawa", "Hamilton", "London"],

//     Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],

//     BritishColumbia: ["Vancouver", "Victoria", "Surrey", "Burnaby"],
//   },

//   Australia: {
//     NewSouthWales: ["Sydney", "Newcastle", "Central Coast", "Wollongong"],

//     Victoria: ["Melbourne", "Geelong", "Ballarat", "Bendigo"],

//     Queensland: ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville"],
//   },
// };
// const App = () => {
//   const [con, setCon] = useState([]);
//   const [states,setStates]=useState([]);
//   const [city,setCity]=useState([])
//   useEffect(() => {
//     const getCoun = () => {
//       const countreys = [];
//       for (const i in data) {
//         countreys.push(i);
//       }
//       setCon(countreys);
//     };

//     getCoun();
//   }, []);

// const  getState = (e)=>{
//     console.log(e.target.value)
//     let s = []  ;
//     const st = [];
//      for (const i in data) {
//       if(i===e.target.value){
//         s=data[i]
//       }
//     }
//     for(const i in s){
//       st.push(i)
//     }
//     setStates(st);
//   }

//  const getCity=(e)=>{

//  }
//   return (
//     <div>
//       <select onChange={(e) => {getState(e)}}>
//         {con.map((item, index) => (
//           <option key={index}>{item}</option>
//         ))}
//       </select>
//       <select onChange={(e) => {getCity(e)}}>
//       {states.map((item, index) => (
//         <option key={index}>{item}</option>
//       ))}
//     </select>
//     </div>
//   );
// };

// export default App;
