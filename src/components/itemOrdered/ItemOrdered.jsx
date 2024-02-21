import React, { useEffect, useState } from "react";
import { StyledDataGrid } from "../../data/StyledDataGrid ";
import { CustomPagination } from "../../data/StyledDataGrid ";
import axios from "axios";

const ItemOrdered = ({ userId }) => {
  const [orderData, setOrderData] = useState([]);
  console.log(userId);
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
 console.log(orderData)
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "userName", headerName: "User", flex: 1 },
    { field: "email", headerName: "Email", width: 150, flex: 1 },
    { field: "totalPrice", headerName: "Total Spend", flex: 1 },
  ];
  const rows = orderData.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  return (
    // <div>
    //   {orderData[0]?.items?.map((item, index) => (
    //     <div key={index} style={{ display: "flex", alignItems: "center" }}>
    //       <img src={item.productId.images[0]} style={{ width: 100, objectFit: "cover" }} />
    //       <div>
    //         <h3>{item.productId.name}</h3>
    //         <h4>Price:- {item.productId.price}</h4>
    //         <h4>Quantity:- {item.quantity}</h4>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div style={{ height: 350, margin: 20 }}>
    <StyledDataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      sx={{}}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      components={{
        Pagination: CustomPagination,
      }}
    />
    </div>
  );
};

export default ItemOrdered;
