import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Transaction from "./pages/transaction/Transaction";
import Reports from "./pages/reports/Reports";
import Feedback from "./pages/feedback/Feedback";
import Orders from "./pages/orders/Orders";
import AddBlog from "./pages/add-blog/AddBlog";
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
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/report" element={<Reports />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/user-detail" element={<User />} />
          <Route path="/order-detail/:orderId" element={<OrderDetail/>}/>
          {/* <Route path="/signup" exact element={<SignUp />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
