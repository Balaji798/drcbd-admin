import "./featuredInfo.css";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export default function FeaturedInfo({totalUser,totalSales}) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">TotalUsers</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalUser}</span>
         {/* <span className="featuredMoneyRate">
            -11.4 <AiOutlineArrowDown  className="featuredIcon negative"/>
  </span>*/}
        </div>
       {/* <span className="featuredSub">Compared to last month</span>*/}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">฿ {totalSales}</span>
          {/*<span className="featuredMoneyRate">
            -1.4 <AiOutlineArrowDown className="featuredIcon negative"/>
</span>*/}
        </div>
        {/*<span className="featuredSub">Compared to last month</span>*/}
      </div>

    </div>
  );
}
