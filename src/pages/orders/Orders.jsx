import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import Papa from "papaparse";
import { CustomPagination, StyledDataGrid } from "../../data/StyledDataGrid ";
import { BsEye } from "react-icons/bs";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  function getDefaultDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${year}-${month}-${day}`;
  }
  const [totalOrders, setOrders] = useState([]);
  const [data, setData] = useState([]);
  const [date, setDate] = useState({
    from: getDefaultDate(),
    to: getDefaultDate(),
  });
  useEffect(() => {
    const getOrders = async () => {
      //const res = await ApiService.getOrders();
      const res = await axios.get(
        "https://drcbd-backend-zgqu.onrender.com/orders/get_all_orders"
      );
      const data = res.data.filter((item) => {
        return item.status[item.status.length - 1].orderStatus !== "pending";
      });
      setData(data);
      setOrders(data);
    };
    getOrders();
  }, []);

  const filter = () => {
    const filteredData = totalOrders.filter((item) => {
      const itemDate = new Date(item.createdAt);
      itemDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero

      const fromDate = new Date(date.from);
      fromDate.setHours(0, 0, 0, 0);

      const toDate = new Date(date.to);
      toDate.setHours(0, 0, 0, 0);

      return itemDate >= fromDate && itemDate <= toDate;
    });
    console.log(filteredData);
    setData(filteredData);
  };

  const filterByStatus = (event) => {
    event.preventDefault();
    if (event.target.value === "all") {
      setData(totalOrders);
      return;
    }
    const filterData = totalOrders.filter((item) => {
      console.log(item.adminStatus, event, item.status === event);
      if (
        item.adminStatus === event.target.value ||
        item.status === event.target.value
      ) {
        return item;
      }
    });
    setData(filterData);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "user",
      headerName: "Name & Email",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <p>{params?.row?.userId?.fullName}</p>
            <p>{params?.row.userId?.email}</p>
          </div>
        );
      },
    },
    {
      field: "product name",
      headerName: "Product Name",
      width: 300,
      renderCell: (params) => {
        return (
          <div style={{ width: "100%" }}>
            {params.row.items.map((item, index) => (
              <div
                style={{ display: "flex", alignItems: "center" }}
                key={index}
              >
                <img
                  src={item?.productId?.images[0]}
                  style={{ width: 25, height: 25 }}
                  alt="/"
                />
                <p>{item.productId?.name},</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "totalPrice",
      headerName: "Total Amount",
      renderCell: (params) => {
        return <p>฿ {params?.row?.totalPrice?.toFixed(2)}</p>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.status[params?.row?.status?.length - 1].orderStatus}
          </p>
        );
      },
    },
    {
      field: "orderTime",
      headerName: "Payment Time",
      width: 200,
      renderCell: (params) => {
        return (
          <p>
            {params?.row?.status[params?.row?.status?.length - 1].statusTime}
          </p>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <Link
            to={`/order-detail/${params?.row?._id}`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <BsEye size={25} />
          </Link>
        );
      },
    },
  ];
  const rows = data.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  const downloadCSV = () => {
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
      }));

      return products;
    });

    // Flatten the array of arrays
    const flattenedData = transformedData.flat();
    const csv = Papa.unparse(flattenedData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to initiate the download
    const a = document.createElement("a");
    a.href = url;
    a.download = `order_${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}.csv`;
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the temporary anchor
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    //toast("Report Dow");
  };
  return (
    <>
      <div className="home">
        <Chart data={data} title="Orders Analytics" grid dataKey="Orders" />
      </div>
      <div
        style={{
          display: "flex",
          width: "97%",
          justifyContent: "space-between",
          marginLeft: 20,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "35%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "0.5rem" }}>
            <p>From</p>
            <input
              style={{ width: 150, padding: "5px 0" }}
              type="date"
              value={date.from}
              onChange={(e) => setDate({ ...date, from: e.target.value })}
            />
          </div>
          <div>
            <p>To</p>
            <input
              style={{ width: 150, padding: "5px 0" }}
              type="date"
              value={date.to}
              onChange={(e) => {
                console.log(e.target.value);
                setDate({ ...date, to: e.target.value });
              }}
            />
          </div>
          <select
            name="cars"
            id="cars"
            style={{
              width: "15rem",
              margin: "1rem 1rem 0 1rem",
              padding: "7px 0",
            }}
            onChange={(e) => filterByStatus(e)}
          >
            <option value="all">All Orders</option>
            <option value="placed">Placed</option>
            <option value="out delivery">Out For Delivery</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
          <button
            style={{
              fontSize: 16,
              marginTop: 16,
              height: 28,
              background: "#004d4a",
              border: "none",
              padding: "5px",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={filter}
          >
            Submit
          </button>
        </div>
        <button
          style={{
            fontSize: 16,
            marginTop: 16,
            height: 28,
            background: "#004d4a",
            border: "none",
            padding: "5px",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={downloadCSV}
        >
          Download Report
        </button>
      </div>
      <div style={{ height: 350, width: "97%", margin: 20 }}>
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
    </>
  );
};

export default Orders;
