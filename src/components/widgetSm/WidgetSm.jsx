import "./widgetSm.css";
import { LiaEyeSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

export default function WidgetSm({ monthUser }) {
  const navigate = useNavigate();
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {monthUser.map((item, index) => (
          <li className="widgetSmListItem" key={index}>
            <div
              className="widgetSmImg"
            >{item.fullName.split(' ').map(word => word[0]).join('')}</div>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{item.fullName}</span>
              <span className="widgetSmUserTitle">{item.email}</span>
            </div>
            <button className="widgetSmButton" onClick={() => {
              navigate("/user-detail", { state: { userId: item._id } });
            }}>
              <LiaEyeSolid className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
