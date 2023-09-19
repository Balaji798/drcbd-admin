import React,{useState,useEffect} from "react";
import { CustomPagination, StyledDataGrid } from "../../data/StyledDataGrid ";
import axios from "axios";

const Feedback = () => {
  const [reviews,setReviews] =useState([]);
  useEffect(()=>{
    const getReviews =async()=>{
      const res = await axios.get('https://drcbd-backend.onrender.com/review/get-reviews');
      console.log(res.data);
      setReviews(res.data)
    }

    getReviews();
  },[])
  const columns = [
    { field: "id", headerName: "No.", width: 90 },
    {field:"userName",headerName:"User Name",width:200},
    {field:"rating",headerName:"Rating",width:100},
    {field:"review",headerName:"Message",width:500},
  ];
  const rows = reviews.map((row, index) => ({
    ...row,
    id: index + 1,
  }));
  return (
    <div style={{ width: "97%", margin: 20 }}>
      <h1>Feedbacks</h1>
      <div style={{ height: 350, width: "100%" }}>
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
    </div>
  );
};

export default Feedback;
