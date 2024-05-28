import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import SideBar from "./components/sidebar/Sidebar";
import OrderDetail from "./pages/orderDetail/OrderDetail";
import ProductList from "./pages/productList/ProductList";
import AddProduct from "./pages/addProduct/AddProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import UserList from "./pages/userList/UserList";
import Feedback from "./pages/feedback/Feedback";
import Orders from "./pages/orders/Orders";
import TopSpender from "./pages/topSpender/TopSpender";
import User from "./pages/user/User";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const user = localStorage.getItem("adminToken");
  console.log(user)
  return (
    <Router>
      {user && <Topbar />}
      {user && <SideBar />}
      <div
        style={{
          marginLeft: user ? "14%" : "0",
          padding: "50px 0 0 20px",
          backgroundColor: "#f6f9fa",
        }}
      >
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="/products" element={<PrivateRoute element={ProductList} />} />
          <Route path="/add-product" element={<PrivateRoute element={AddProduct} />} />
          <Route path="/edit-product/:productId" element={<PrivateRoute element={EditProduct} />} />
          <Route path="/users" element={<PrivateRoute element={UserList} />} />
          <Route path="/feedback" element={<PrivateRoute element={Feedback} />} />
          <Route path="/orders" element={<PrivateRoute element={Orders} />} />
          <Route path="/user-detail" element={<PrivateRoute element={User} />} />
          <Route path="/order-detail/:orderId" element={<PrivateRoute element={OrderDetail} />} />
          <Route path="/top_spender" element={<PrivateRoute element={TopSpender} />} />
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
