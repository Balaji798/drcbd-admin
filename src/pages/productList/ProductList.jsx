import "./productList.css";
import { MdDeleteOutline } from "react-icons/md";
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ApiService from "../../services/ApiService";

export default function ProductList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    const res = await axios.get("https://drcbd-backend-zgqu.onrender.com/product/get_products");
    if(res.status === 401){
      navigate("/login")
    }
    setData(res.data);
  };
  const handleDelete = async(id) => {
    const response = await ApiService.deleteProduct(id);
    if(response.status === 401){
      navigate("/login")
    }
    const res = await axios.get("https://drcbd-backend-zgqu.onrender.com/product/get_products");
  
    setData(res.data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50,height:70 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      height:70,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.images[0]} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {field:"category",headerName:"Category",width:100},
    {field:"fdaProduct",headerName:"FDA or Non FDA",width:130,      renderCell: (params) => {
      return (
        <p>{params.row.fdaProduct?"FDA":"NoN FDA"}</p>
      );
    },},
    { field: "quantity", headerName: "Quantity", width: 70 },
    {
      field: "fda",
      headerName: "FDA Number",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/edit-product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <MdDeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

console.log(data);
  const rows = data.map((row, index) => ({
    ...row,
    id: index + 1,
  }));

  return (
    <>
      <div style={{ padding: "50px 0" }}>
        <Link
          style={{
            marginBottom: "2em",
            borderRadius: 5,
            padding: "10px 15px",
            border: "1px solid",
            background: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          to="/add-product"
        >
          Add Product
        </Link>
      </div>

      <div style={{ height: 550, width: "100%" }}>
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
    </>
  );
}
