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
      const data = res.data.filter((item) => {
        return item.status[item.status.length - 1].orderStatus !== "pending";
      });
      const transformedData = data.map((order) => {
        const deliveryDetails = order.deliveryAddress;
        const products = order.items.map((item) => ({
          _id: order._id,
          address: deliveryDetails?.address,
          city: deliveryDetails?.city,
          contactNumber: deliveryDetails?.contactNumber,
          country: deliveryDetails?.country,
          postalCode: deliveryDetails?.postalCode,
          name: item.productId?.name,
          price: item.productId?.price,
          orderStatus: order?.status[order?.status?.length - 1]?.orderStatus,
          userName: item.productId?.name,
          productImage: item.productId?.images[0],
          totalQty: item.quantity
        }));

        return products;
      });
      console.log(res.data);
      setOrderData(transformedData);
    };
    getUserOrders();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row[0].productImage}
              alt=""
            />
            {params.row[0].userName}
          </div>
        );
      },
    },
    { field: "totalQty", headerName: "Qty", width: 150, flex: 1,renderCell:(params)=>{
      return(
        <p>{params.row[0].totalQty}</p>
      )
    }  },
    { field: "price", headerName: "Total Spend", flex: 1,renderCell:(params)=>{
      return(
        <p>{params.row[0].price}</p>
      )
    } 
  },
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
