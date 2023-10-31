"use client";
import "./sidebar.css";
// import {
//   LineStyle,
//   Timeline,
//   TrendingUp,
//   PermIdentity,
//   Storefront,
//   AttachMoney,
//   BarChart,
//   DynamicFeed,
// } from "@material-ui/icons";
import {Link} from "react-router-dom";

const Sidebar = () => {
  const navData = [
    {
      title: "Dashboard",
      //icon: <LineStyle className="sidebarIcon" />,
      link: "/",
    },
    {
      title: "Users",
      //icon: <PermIdentity className="sidebarIcon" />,
      link: "/users",
    },
    {
      title:"Orders",
      link:"/orders"
    },
    {
      title: "Sales",
      //icon: <TrendingUp className="sidebarIcon" />,
      link: "/sales",
    },
    {
      title: "Products",
      //icon: <Storefront className="sidebarIcon" />,
      link: "/products",
    },
    // {
    //   title: "Transaction",
    //   //icon: <Timeline className="sidebarIcon" />,
    //   link: "/transaction",
    // },
    {
      title:"CBD University",
      link:"/cbd-university"
    },
    {
      title: "Reports",
      //icon: <BarChart className="sidebarIcon" />,
      link: "/report",
    },
    {
      title:"Feedback",
      //icon:<DynamicFeed className="sidebarIcon" />,
      link:"/feedback"
    },
  ];
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            {navData.map((item, index) => (
              <Link to={item.link} className="link">
                <li className="sidebarListItem active">
                  {/* {item.icon} */}
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
