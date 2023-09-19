import React from "react";

const DeliveryAddress = ({ addresses }) => {
  console.log(addresses);
  return (
    <div>
      {addresses?.map((item, index) => (
        <div key={index}>
          <div style={{ display: "flex", justifyContent: "space-between",padding:10 }}>
            <div style={{ width: "30%" }}>
              <p>City</p>
              <p>{item.city}</p>
            </div>
            <div style={{ width: "30%" }}>
              <p>Country</p>
              <p>{item.country}</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between",padding:10 }}>
            <div style={{ width: "30%" }}>
              <p>Postal Code</p>
              <p>{item.postalCode}</p>
            </div>
            <div style={{ width: "30%" }}>
              <p>Contact Number</p>
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
