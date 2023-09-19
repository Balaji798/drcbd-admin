import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiCloudDownload } from "react-icons/bi";
import axios from "axios";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [toDeleteImg, setToDeleteImg] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    getProductById();
  }, []);
  const getProductById = async () => {
    const res = await axios.post(
      "https://drcbd-backend.onrender.com/product/product_by_id",
      { productId: productId }
    );
    console.log(res.data);
    setProduct(res.data);
  };

  const [file, setFile] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files);
  };
  const handelSubmit = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("file", file[i]);
      }
      formData.append("productId",product._id);
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("productFor", product.productFor);
      formData.append("des", product.des);
      formData.append("fda", product.fda);
      formData.append("quantity", product.quantity);
      formData.append("price", product.price);
      formData.append("dosage", product.dosage);
      formData.append("ingredient", product.ingredient);
      formData.append("suitableFor", product.suitableFor);
      formData.append("use", product.use);
      formData.append("toDelete",JSON.stringify(toDeleteImg));
      formData.append(
        "storageContraindication",
        product.storageContraindication
      );
      formData.append("warningPrecaution", product.warningPrecaution);
      const res = await axios.post(
        "https://drcbd-backend.onrender.com/product/edit_product",
        formData
      );
    } catch (error) {
      console.log("Signup failed", error.message);
    }
  };
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
            width: "50%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingTop: "2rem",
          }}
        >
          {product?.images?.map((item, index) => (
            <div
              key={index}
              style={{
                width: "10rem",
                height: "13rem",
                background: "#fff",
                border: "1px solid",
                borderRadius:"5px"
              }}
            >
              <img src={item} style={{ width: "100%", objectFit: "cover" }} />
              <input
                type="checkbox"
                style={{ width: "2.5rem" }}
                onChange={() => {
                  if (!toDeleteImg.includes(item)) {
                    setToDeleteImg([...toDeleteImg, item]);
                  } else {
                    const updatedCheck = [...toDeleteImg];
                    updatedCheck.splice(index, 1);
                    setToDeleteImg(updatedCheck);
                  }
                }}
              />
            </div>
          ))}
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
        <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
          <label>Price In ฿</label>
          <input
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            style={{ width: "100%" }}
            value={product?.price}
          />
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
      <button className="addButton" onClick={handelSubmit}>
        Add Product
      </button>
    </div>
  );
};

export default EditProduct;
