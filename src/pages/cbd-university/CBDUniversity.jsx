import React from "react";
import { Link } from "react-router-dom";
import { CustomPagination, StyledDataGrid } from "../../data/StyledDataGrid ";

const CBDUniversity = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
  ];
  const rows = [];
  return (
    <div style={{ margin: 20, width: "97%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <select
          style={{
            width: 200,
            padding: "2.5px 5px",
            fontSize: 18,
            marginBottom: 40,
          }}
        >
          {/* "Health", "Medical", "Research","News","Press Release" */}
          <option>Health</option>
          <option>Medical</option>
          <option>Research</option>
          <option>News</option>
          <option>Press</option>
          <option>Release</option>
        </select>
        <Link
          to="/add-blog"
          style={{
            marginBottom: "2em",
            borderRadius: 5,
            padding: "10px 15px",
            border: "1px solid",
            background: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Bog
        </Link>
      </div>
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

export default CBDUniversity;
