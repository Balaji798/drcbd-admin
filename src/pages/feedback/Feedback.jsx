import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { CustomPagination, StyledDataGrid } from "../../data/StyledDataGrid ";
import axios from "axios";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get("http://52.77.244.89:8080review/get-reviews");
      setReviews(res.data);
    };

    getReviews();
  }, []);
  const columns = [
    { field: "id", headerName: "No.", width: 90 },
    { field: "userName", headerName: "User Name", width: 200 },
    { field: "rating", headerName: "Rating", width: 70 },
    {
      field: "productId",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div style={{display:"flex",alignItems:"center"}}>
            <img src={params?.row?.productId?.images[0]} style={{ width: 35 }} />
            <p>{params?.row?.productId?.name}</p>
          </div>
        );
      },
    },
    { field: "review", headerName: "Message", width: 500 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <MdDelete
            size={25}
            onClick={async () => {
              const res = await axios.delete(
                `http://52.77.244.89:8080review/reviewDelete/${params.row._id}`
              );
              console.log(res.data);
              setReviews(res.data);
            }}
          />
        );
      },
    },
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
