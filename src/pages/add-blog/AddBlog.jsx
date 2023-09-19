import React, { useState } from "react";
import { BiCloudDownload } from "react-icons/bi";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    type: "",
    title: "",
    paragraph: "",
  });
  const [file, setFile] = useState("");
  //formData.append("productFor",product.productFor)
  return (
    <div>
      <p>Blog Type</p>
      <select
        style={{
          width: 200,
          padding: "2.5px 5px",
          fontSize: 18,
          marginBottom: 40,
        }}
        onChange={(e) => {
          setBlog({ ...blog, type: e.target.value });
        }}
      >
        {/* "Health", "Medical", "Research","News","Press Release" */}
        <option>Health</option>
        <option>Medical</option>
        <option>Research</option>
        <option>News</option>
        <option>Press</option>
        <option>Release</option>
      </select>
      <p>Title</p>
      <input
        onChange={(e) => {
          setBlog({ ...blog, title: e.target.value });
        }}
      />
            <p>Usage For</p>
      <textarea
        style={{ height: 250, width: "80%" }}
        // onChange={(e) => {
        //   setBlog({ ...blog, paragraph: e.target.value });
        // }}
      />
      <p>Paragraph</p>
      <textarea
        style={{ height: 250, width: "80%" }}
        onChange={(e) => {
          setBlog({ ...blog, paragraph: e.target.value });
        }}
      />
      <div className="file">
        <h3 style={{ padding: "20px 0" }}>Blog Images</h3>
        <div className="file-input">
          <BiCloudDownload style={{ fontSize: 65 }} />
          <p>Drag And Drop</p>
          or
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
