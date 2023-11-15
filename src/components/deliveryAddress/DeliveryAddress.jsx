import React from "react";

const DeliveryAddress = ({ addresses }) => {
  return (
    <div>
      {addresses?.map((item, index) => (
        <div
          key={index}
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <h4 style={{textAlign:"center",paddingBottom:10}}>Address {index+1}</h4>
          <div style={{ display: "flex", paddingLeft: 10 }}>
            <p style={{ paddingRight: 5 }}>Street:-</p>
            <p>{item.address}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <div style={{ width: "40%", display: "flex" }}>
              <p style={{ paddingRight: 5 }}>City:-</p>
              <p>{item.city}</p>
            </div>
            <div style={{ width: "40%", display: "flex" }}>
              <p style={{ paddingRight: 5 }}>Country:-</p>
              <p>{item.country}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <div style={{ width: "30%", display: "flex" }}>
              <p style={{ paddingRight: 5 }}>Postal Code:-</p>
              <p>{item.postalCode}</p>
            </div>
            <div style={{ width: "40%", display: "flex" }}>
              <p style={{ paddingRight: 5 }}>Contact Number:-</p>
              <p>{item.contactNumber}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryAddress;

// address
// :
// "vasali Maat"
// city
// :
// "kolkatha"
// contactNumber
// :
// ""
// country
// :
// "India"
// other
// :
// ""
// postalCode
// :
// "743127"
// taxId
// :
// ""
