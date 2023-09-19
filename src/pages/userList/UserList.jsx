import "./userList.css";
import { MdDeleteOutline } from "react-icons/md";
import { StyledDataGrid } from "../../data/StyledDataGrid ";
import { CustomPagination } from "../../data/StyledDataGrid ";
import { Link,useNavigate } from "react-router-dom";
import { GiSunkenEye } from "react-icons/gi";
import { userData } from "../../dummyData";
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../../components/chart/Chart";

export default function UserList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await axios.get("https://drcbd-backend.onrender.com/user/get-users-list");
    console.log(res.data);
    setData(res.data);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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
            <a onClick={()=>{navigate('/user-detail',{state:{userId:params.row._id}})}}>
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

  return (
    <>
      <div className="home">
        <Chart
          data={userData}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
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
