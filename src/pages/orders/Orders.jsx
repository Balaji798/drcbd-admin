import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import Papa from "papaparse";
import { userData } from "../../dummyData";
import { CustomPagination, StyledDataGrid } from "../../data/StyledDataGrid ";
import ApiService from "../../services/ApiService";
import { BsEye } from "react-icons/bs";
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
  const [data, setData] = useState([]);
  const [date, setDate] = useState({
    from: getDefaultDate(),
    to: getDefaultDate(),
  });
  useEffect(() => {
    const getOrders = async () => {
      //const res = await ApiService.getOrders();
      const res = await axios.get(
        "https://drcbd-backend.onrender.com/orders/get_all_orders"
      );
      setData(res.data);
    };
    getOrders();
  }, []);

  const filter = () => {
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(date.from) && itemDate <= new Date(date.to);
    });
    setData(filteredData);
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
            <p>{params.row.userId.fullName}</p>
            <p>{params.row.userId.email}</p>
          </div>
        );
      },
    },
    {
      field: "product name",
      headerName: "Product Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
            {params.row.items.map((item, index) => (
              <div style={{}} key={index}>
                <p>{item.productId.name},</p>
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
        return <p>฿ {params.row.totalPrice.toFixed(2)}</p>;
      },
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "orderTime",
      headerName: "Payment Time",
      width: 200,
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
            to={`/order-detail/${params.row._id}`}
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


  const downloadCSV=()=> {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary anchor element to initiate the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
  
    // Clean up by removing the temporary anchor
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <div className="home">
        <Chart
          data={userData}
          title="Orders Analytics"
          grid
          dataKey="Active User"
        />
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
          <div>
            <p>From</p>
            <input
              style={{ width: 150 }}
              type="date"
              value={date.from}
              onChange={(e) => setDate({ ...date, from: e.target.value })}
            />
          </div>
          <div>
            <p>To</p>
            <input
              style={{ width: 150 }}
              type="date"
              value={date.to}
              onChange={(e) => setDate({ ...date, to: e.target.value })}
            />
          </div>
          <button
            style={{ fontSize: 16, marginTop: 16, height: 28 }}
            onClick={filter}
          >
            Submit
          </button>
        </div>
        <button
          style={{ fontSize: 16, marginTop: 16, height: 28 }}
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
