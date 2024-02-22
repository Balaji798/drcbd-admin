import React, { useState, useEffect } from "react";
import Papa from 'papaparse';
import {userRows } from "../../dummyData";
import { CustomPagination, StyledDataGrid } from "../../data/StyledDataGrid ";
import axios from "axios";

const TopSpender = () => {
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

  useEffect(()=>{
    const gatData = async () => {
      const {data} = await axios.get('https://drcbd-backend-zgqu.onrender.com/orders/get_top_spender')
      setData(data)
    }
    gatData()
  },[])
  const filter = () => {
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(date.from) && itemDate <= new Date(date.to);
    });
    setData(filteredData);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {field:"userName",headerName:"User",flex:1},
    {field:"email",headerName:"Email",width:150,flex:1},
    {field:'contactNumber',headerName:'Contact Number',flex:1},
    {field:"totalPrice",headerName:"Total Spend",flex:1}
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
      <div
        style={{
          display: "flex",
          width: "97%",
          justifyContent: "space-between",
          marginLeft: 20,
          alignItems:"center"
        }}
      >
      <h2>Top Spenders On CBD</h2>
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

export default TopSpender;
