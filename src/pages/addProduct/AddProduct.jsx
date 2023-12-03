import React, { useState, useEffect } from "react";
import { BiCloudDownload } from "react-icons/bi";

import axios from "axios";
import "./addProduct.css";
import { productIcon } from "../../dummyData";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    category1: "",
    category2: "",
    category3: "",
    des: "",
    fda: "",
    size: "",
    quantity: "",
    price: "",
    dosage: "",
    ingredient: "",
    suitableFor: "",
    use: "",
    storageContraindication: "",
    warningPrecaution: "",
    productFor: "",
    videoLink: "",
  });
  const [file, setFile] = useState("");

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    const res = await axios.get(
      "https://drcbd-backend.onrender.com/product/get_products"
    );
    console.log(res.data);
    setProduct(res.data[res.data.length - 1]);
  };

  const saveFile = (e) => {
    setFile(e.target.files);
  };
  const handelSubmit = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }
      formData.append("name", product.name);
      formData.append("videoLink", product.videoLink);
      formData.append("category1", product.category1);
      formData.append("category2", product.category2);
      formData.append("category3", product.category3);
      formData.append("des", product.des);
      formData.append("productFor", product.productFor);
      formData.append("fda", product.fda);
      formData.append("quantity", product.quantity);
      formData.append("size", product.size);
      formData.append("price", product.price);
      formData.append("dosage", product.dosage);
      formData.append("ingredient", product.ingredient);
      formData.append("suitableFor", product.suitableFor);
      formData.append("use", product.use);
      formData.append(
        "storageContraindication",
        product.storageContraindication
      );
      formData.append("warningPrecaution", product.warningPrecaution);
      const res = await axios.post(
        "https://drcbd-backend.onrender.com/product/add_product",
        formData
      );
    } catch (error) {
      console.log("Signup failed", error.message);
    }
  };
  console.log(product);
  return (
    <div
      style={{
        marginLeft: "2em",
        width: "80%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "50%" }}>
          <label>Product Name</label>
          <input
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            style={{ width: "80%" }}
            value={product?.name}
          />
        </div>
        <div style={{ width: "50%" }}>
          <label>Product Category 1</label>
          <input
            onChange={(e) =>
              setProduct({ ...product, category1: e.target.value })
            }
            style={{ width: "80%" }}
            value={product?.category1}
          />
        </div>
        <div style={{ width: "50%" }}>
          <label>Product Category 2</label>
          <input
            onChange={(e) =>
              setProduct({ ...product, category2: e.target.value })
            }
            style={{ width: "80%" }}
            value={product?.category2}
          />
        </div>
        <div style={{ width: "50%" }}>
          <label>Product Category 3</label>
          <input
            onChange={(e) =>
              setProduct({ ...product, category3: e.target.value })
            }
            style={{ width: "80%" }}
            value={product?.category3}
          />
        </div>
      </div>
      {/* <label>Product Images</label>
      <input type="file" name="file" multiple={true} onChange={saveFile} /> */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div className="file">
          <h3 style={{ padding: "20px 0" }}>Product Images</h3>
          <div className="file-input">
            <BiCloudDownload style={{ fontSize: 65 }} />
            <p>Drag And Drop</p>
            or
            <input type="file" multiple={true} onChange={saveFile} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px ",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "55%",
          }}
        >
          <div style={{ width: "45%" }}>
            <label>FDA No.</label>
            <input
              onChange={(e) => setProduct({ ...product, fda: e.target.value })}
              style={{ width: "100%" }}
              value={product?.fda}
            />
          </div>
          <div style={{ width: "45%" }}>
            <label>Quantity</label>
            <input
              type="number"
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
              style={{ width: "100%" }}
              value={product?.quantity}
            />
          </div>
          <div style={{ width: "45%" }}>
            <label>Size</label>
            <input
              onChange={(e) => setProduct({ ...product, size: e.target.value })}
              style={{ width: "100%" }}
              value={product?.size}
            />
          </div>
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <label>Price In ฿</label>
            <input
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              style={{ width: "100%" }}
              value={product?.price}
            />
          </div>
        </div>
      </div>
      <label>Video Link</label>
      <textarea
        onChange={(e) => setProduct({ ...product, videoLink: e.target.value })}
        value={product?.videoLink}
      />
      <label>Product Description</label>
      <textarea
        onChange={(e) => setProduct({ ...product, des: e.target.value })}
        value={product?.des}
      />

      <label>Dosage Form</label>
      <textarea
        onChange={(e) => setProduct({ ...product, dosage: e.target.value })}
        value={product?.dosage}
      />
      <label>Ingredient</label>
      <textarea
        onChange={(e) => setProduct({ ...product, ingredient: e.target.value })}
        value={product?.ingredient}
      />

      <label>Usage For</label>
      <textarea
        onChange={(e) => {
          setProduct({ ...product, productFor: e.target.value });
        }}
        value={product?.productFor?.toString()}
      />
      <label>Suitable For</label>
      <textarea
        onChange={(e) =>
          setProduct({ ...product, suitableFor: e.target.value })
        }
        value={product?.suitableFor}
      />
      <label>How To Use</label>
      <textarea
        onChange={(e) => setProduct({ ...product, use: e.target.value })}
        value={product?.use}
      />
      <label>Storage & Contraindication</label>
      <textarea
        onChange={(e) =>
          setProduct({ ...product, storageContraindication: e.target.value })
        }
        value={product?.storageContraindication}
      />
      <label>Warning & Precaution</label>
      <textarea
        onChange={(e) =>
          setProduct({ ...product, warningPrecaution: e.target.value })
        }
        value={product?.warningPrecaution}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {productIcon.map((item, index) => (
          <img src={item} key={index} alt="/" style={{ width: "100px" }} />
        ))}
      </div>
      <button className="addButton" onClick={handelSubmit}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
