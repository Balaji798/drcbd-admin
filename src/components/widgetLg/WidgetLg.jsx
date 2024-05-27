import "./widgetLg.css";

export default function WidgetLg({ monthSales }) {
  console.log(monthSales);
  const Button = ({ type }) => {
    return (
      <button
        className={"widgetLgButton " + type}
        style={{ textTransform: "uppercase" }}
      >
        {type}
      </button>
    );
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {monthSales.length > 0 &&
          monthSales.map((item, index) => {
            // Parse the date string
            const date = new Date(
              item?.status[item.status.length - 1]?.statusTime
            );
            // Format the date to "DD MMM YYYY"
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });

            return (
              <tr className="widgetLgTr" key={index}>
                <td className="widgetLgUser">
                  <div className="widgetSmImg">
                    {item?.userId?.fullName
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                  <span className="widgetLgName">{item?.userId?.fullName}</span>
                </td>
                <td className="widgetLgDate">{formattedDate}</td>
                <td className="widgetLgAmount">฿{item?.totalPrice}</td>
                <td className="widgetLgStatus">
                  <Button
                    type={item?.status[item.status.length - 1]?.orderStatus}
                  />
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}
