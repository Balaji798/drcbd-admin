import "./featuredInfo.css";

export default function FeaturedInfo({totalUser,totalSales,monthUser}) {
  return (
    <div className="featured">
      <div className="featuredItem">
      <div className="featuredMoneyContainer">
          <span className="featuredTitle">TotalUsers</span>
          <span className="featuredMoney">{totalUser}</span>
      </div>
        <div className="featuredMoneyContainer">
          <span className="featuredTitle">This Month Users</span>
          <span className="featuredMoney">{monthUser?.length}</span>
        </div>
       {/* <span className="featuredSub">Compared to last month</span>*/}
      </div>
      <div className="featuredItem">
      <div className="featuredMoneyContainer">
          <span className="featuredTitle">Total Sales</span>
          <span className="featuredMoney">฿ {totalSales}</span>
        </div>
        <div className="featuredMoneyContainer">
      </div>
      </div>
    </div>
  );
}
