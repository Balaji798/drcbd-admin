import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { CustomPagination, StyledDataGrid } from "../../data/StyledDataGrid ";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get(
        "https://drcbd-backend-zgqu.onrender.com/review/get-reviews"
      );
      if (res.status === 401) {
        navigate("/login");
      }
      setReviews(res.data);
    };

    getReviews();
  }, [reviews]);
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
          <div style={{ display: "flex", alignItems: "center" }}>
            {params?.row?.productId?.images[0] ? (
              <img
                src={params?.row?.productId?.images[0]}
                style={{ width: 35 }}
                alt="/"
              />
            ) : (
              ""
            )}
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
              const data = reviews.filter((item) => {
                return item !== params.row._id;
              });
              const res = await ApiService.deleteReviews(params.row._id);

              setReviews(data);
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
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          sx={{}}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                /* page: 0 // default value will be used if not passed */
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Feedback;
