import "./userList.css";
import { StyledDataGrid } from "../../data/StyledDataGrid ";
import { CustomPagination } from "../../data/StyledDataGrid ";
import { Link, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import { GiSunkenEye } from "react-icons/gi";

import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../../components/chart/Chart";

export default function UserList() {
  const navigate = useNavigate();
  function getDefaultDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${year}-${month}-${day}`;
  }
  const [totalOrders, setOrders] = useState([]);
  const [date, setDate] = useState({
    from: getDefaultDate(),
    to: getDefaultDate(),
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await axios.get(
      "https://drcbd-backend-zgqu.onrender.com/user/get-users-list"
    );
    setData(res.data);
    setOrders(res.data)
  };


  const filter = () => {
    const filteredData = totalOrders.filter((item) => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= new Date(date.from) && itemDate <= new Date(date.to);
    });
    setData(filteredData);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fullName",
      headerName: "User Name",
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <div className="userListUser">
      //       <img className="userListImg" src={params.row.avatar} alt="" />
      //       {params.row.username}
      //     </div>
      //   );
      // },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
         <p>{params.row.emailVerified?"Verified":"Not Verified"}</p>
        );
      },
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <div style={{}}>
            <a
              href="#"
              onClick={() => {
                navigate("/user-detail", { state: { userId: params.row._id } });
              }}
            >
              <GiSunkenEye
                style={{ fontSize: 25, color: "red", cursor: "pointer" }}
              />
            </a>
          </div>
        );
      },
    },
  ];

  const rows = data.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  const downloadCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to initiate the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the temporary anchor
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="home">
        <Chart data={totalOrders} title="User Analytics" grid dataKey="Active User" />
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
              onChange={(e) => setDate({ ...date, to: e.target.value })}
            />
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
            onClick={filter}
          >
            Submit
          </button>
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
          onClick={()=>setData(totalOrders)}
        >
          Reset
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
      <div style={{ height: 350, width: "90%", margin: 20 }}>
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
}
