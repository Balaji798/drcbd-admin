import React,{useState} from 'react'
import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
import { CustomPagination, StyledDataGrid } from '../../data/StyledDataGrid ';

const Sales = () => {
  function getDefaultDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const [date, setDate] = useState({
    from: getDefaultDate(),
    to: getDefaultDate(),
  });

    const columns = [{ field: "id", headerName: "ID", width: 90 }];
    const rows = [];

    const filter = () => {
      // const filteredData = data.filter((item) => {
      //   const itemDate = new Date(item.date);
      //   return itemDate >= new Date(date.from) && itemDate <= new Date(date.to);
      // });
      // setData(filteredData);
    };
  return (
    <>
      <div className="home">
        <Chart
          data={userData}
          title="Sales Analytics"
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
          onClick={filter}
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
  )
}

export default Sales