import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiCloudDownload } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { productIcon } from "../../dummyData";
import "./editProduct.css";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const [productIcons, setProductIcons] = useState([]);
  const [toDeleteImg, setToDeleteImg] = useState([]);
  const [productFor, setProductFor] = useState([]);
  const [warningPrecaution, setWarningPrecaution] = useState([]);
  const [purposeName, setPurposeName] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);
  const getProductById = async () => {
    const res = await axios.post(
      "https://drcbd-backend.onrender.com/product/product_by_id",
      { productId: productId }
    );
    //console.log(res.data);
    setProductIcons(res.data.productIcons);
    setProductFor(res.data.productFor);
    setCategoryName(res.data.categoryName);
    setPurposeName(res.data.purposeName);
    setWarningPrecaution(res.data.warningPrecaution);
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
      formData.append("productId", product._id);
      formData.append("name", product.name);
      formData.append("cbdByCategory", product.cbdByCategory);
      formData.append("cbdByPurpose", product.cbdByPurpose);
      formData.append("categoryName", categoryName);
      formData.append("purposeName", purposeName);
      formData.append("productFor", JSON.stringify(productFor));
      formData.append("des", product.des);
      formData.append("fda", product.fda);
      formData.append("quantity", product.quantity);
      formData.append("price", product.price);
      formData.append("dosage", product.dosage);
      formData.append("ingredient", product.ingredient);
      formData.append("suitableFor", product.suitableFor);
      formData.append("use", product.use);
      formData.append("shippingFee", product.shippingFee);
      formData.append("actualPrice", product.actualPrice);
      formData.append("toDelete", JSON.stringify(toDeleteImg));
      formData.append(
        "storageContraindication",
        product.storageContraindication
      );
      formData.append("warningPrecaution", JSON.stringify(warningPrecaution));
      formData.append("productIcons", JSON.stringify(productIcons));
      const res = await axios.post(
        "https://drcbd-backend.onrender.com/product/edit_product",
        formData
      );
      console.log(typeof res.data);
      if (res.data === "success") {
        navigate("/products");
      }
    } catch (error) {
      console.log("Signup failed", error.message);
    }
  };

  const handelAdd1 = () => {
    setProductFor([...productFor, ""]);
  };

  const handelDelete = (index) => {
    const list = productFor.filter((item) => {
      return item !== index;
    });
    setProductFor(list);
  };

  const handelAdd2 = () => {
    setWarningPrecaution([...warningPrecaution, ""]);
  };

  const handelDelete2 = (index) => {
    const list = warningPrecaution.filter((item) => {
      return item !== index;
    });
    setWarningPrecaution(list);
  };

  const handleWPInputChange = (index, value) => {
    const updatedWarningPrecaution = [...warningPrecaution];
    updatedWarningPrecaution[index] = value;
    setWarningPrecaution(updatedWarningPrecaution);
  };

  const handlePInputChange = (index, value) => {
    const updatedProductFor = [...productFor];
    updatedProductFor[index] = value;
    setProductFor(updatedProductFor);
  };

  const options1 = [
    "CBD OIL",
    "CBD SUPPLEMENTS",
    "CBD FACE",
    "CBD BODY",
    "CBD BEVERAGE",
    "AROMATHERAPY",
    "CBD FOR PETS",
  ];

  const options2 = [
    "SLEEP",
    "IMMUNITY",
    "ENERGY",
    "ANXIETY",
    "MUSCLES & JOINTS",
    "CANCER",
    "PALLIATIVE CARE",
    "SKINCARE",
    "NCD’S (NON-COMMUNICABLE DISEASES)",
    "AROMATHERAPY",
    "HORMONES",
    "OPIOID",
    "WEIGHT MANAGEMENT",
  ];

  return (
    <div
      style={{
        marginLeft: "2em",
        width: "80%",
        display: "flex",
        flexDirection: "column",
      }}
      className="edit_product"
    >
      <div style={{ width: "50%" }}>
        <label>Product Name</label>
        <input
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          style={{ width: "80%" }}
          value={product?.name}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "50%" }}>
          <div style={{ width: "100%", padding: "10px 0 5px" }}>
            <label>CBD BY CATEGORY</label>
            <input
              onChange={(e) => {
                setProduct({
                  ...product,
                  cbdByCategory: product.cbdByCategory,
                });
              }}
              type="checkbox"
              style={{ width: "1rem", height: "1rem", marginLeft: "1rem" }}
              value={product?.cbdByCategory || false}
            />
          </div>
          <div style={{ width: "100%", padding: "10px 0 5px" }}>
            <label>CBD By Category Category's Name</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                border: "1px solid",
                width: "80%",
                padding: 5,
                minHeight: 100,
              }}
            >
              {categoryName?.map((item, index) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2.5px 3px",
                    border: "1px solid",
                    borderRadius: "5px",
                    marginLeft: 2,
                    marginBottom: 2,
                    height: 20,
                  }}
                  key={index}
                >
                  <p style={{ fontSize: 13 }}>{item}</p>
                  <RxCross2
                    onClick={() => {
                      const updatedCategories = [...categoryName];
                      updatedCategories.splice(index, 1);
                      setCategoryName(updatedCategories);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <label style={{ padding: "5px 0 2.5px", marginRight: "1rem" }}>
            Options
          </label>
          <select
            name={options1[0]}
            onChange={(e) => {
              if (!categoryName.includes(e.target.value))
                setCategoryName([...categoryName, e.target.value]);
            }}
          >
            {options1.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div style={{ width: "50%" }}>
          <div style={{ width: "50%", display: "flex" }}>
            <label>CBD BY PURPOSE</label>
            <input
              onChange={() => {
                setProduct({ ...product, cbdByPurpose: !product.cbdByPurpose });
              }}
              type="checkbox"
              style={{ width: "1rem", height: "1rem", marginLeft: "1rem" }}
              checked={product?.cbdByPurpose || false}
            />
          </div>
          <div style={{ width: "100%", padding: "10px 0 5px" }}>
            <label>CBD By Purpose Category's Name</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                border: "1px solid",
                width: "80%",
                padding: 5,
                minHeight: 100,
              }}
            >
              {purposeName?.map((item, index) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2.5px 3px",
                    border: "1px solid",
                    borderRadius: "5px",
                    marginLeft: 2,
                    marginBottom: 2,
                    height: 20,
                  }}
                  key={index}
                >
                  <p style={{ fontSize: 13 }}>{item}</p>
                  <RxCross2
                    onClick={() => {
                      const updatedCategories = [...purposeName];
                      updatedCategories.splice(index, 1);
                      setPurposeName(updatedCategories);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <label style={{ padding: "5px 0 2.5px", marginRight: "1rem" }}>
            Options
          </label>
          <select
            name={options2[0]}
            onChange={(e) => {
              if (!purposeName.includes(e.target.value))
                setPurposeName([...purposeName, e.target.value]);
            }}
          >
            {options2.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
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
                borderRadius: "5px",
                marginBottom: 5,
                overflow: "hidden",
              }}
            >
              <img
                src={item}
                style={{ width: "100%", objectFit: "cover" }}
                alt="/"
              />
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
      <div style={{ width: "40%" }}>
        <label>FDA No.</label>
        <input
          onChange={(e) => setProduct({ ...product, fda: e.target.value })}
          style={{ width: "100%", padding: "5px", fontWeight: "bold" }}
          value={product?.fda}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px 10px 0",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "55%",
        }}
      >
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
        <div style={{ width: "45%", display: "flex", flexDirection: "column" }}>
          <label>Actual Price In ฿</label>
          <input
            onChange={(e) =>
              setProduct({ ...product, actualPrice: e.target.value })
            }
            style={{ width: "100%" }}
            value={product?.actualPrice}
          />
        </div>
        <div style={{ width: "45%", display: "flex", flexDirection: "column" }}>
          <label>Selling Price In ฿</label>
          <input
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            style={{ width: "100%" }}
            value={product?.price}
          />
        </div>
        <div style={{ width: "45%", display: "flex", flexDirection: "column" }}>
          <label>Shipping Fee In ฿</label>
          <input
            onChange={(e) =>
              setProduct({ ...product, shippingFee: e.target.value })
            }
            style={{ width: "100%" }}
            value={product?.shippingFee}
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
      {productFor?.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            width: "60%",
            marginBottom: "0.5rem",
          }}
        >
          <input
            style={{ width: "80%", padding: 5 }}
            onChange={(e) => handlePInputChange(index, e.target.value)}
            value={item}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid red",
              marginLeft: "5px",
              color: "red",
              padding: 3,
              borderRadius: 3,
            }}
            onClick={() => handelAdd1(index)}
          >
            <IoMdAddCircleOutline size={22} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #005652",
              marginLeft: "5px",
              color: "#005652",
              borderRadius: 3,
              padding: 3,
              cursor: "pointer",
            }}
            onClick={() => handelDelete(item)}
          >
            <RiDeleteBinLine size={22} />
          </div>
        </div>
      ))}
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
      {warningPrecaution?.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            width: "60%",
            marginBottom: "0.5rem",
          }}
        >
          <input
            style={{ width: "80%", padding: 5 }}
            onChange={(e) => handleWPInputChange(index, e.target.value)}
            value={item}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid red",
              marginLeft: "5px",
              color: "red",
              padding: 3,
              borderRadius: 3,
            }}
            onClick={handelAdd2}
          >
            <IoMdAddCircleOutline size={22} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #005652",
              marginLeft: "5px",
              color: "#005652",
              borderRadius: 3,
              padding: 3,
            }}
            onClick={() => handelDelete2(item)}
          >
            <RiDeleteBinLine size={22} />
          </div>
        </div>
      ))}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {productIcon.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {item.icons.map((icon, i) => (
                <div
                  style={{
                    width: 100,
                    height: 100,
                    padding: 5,
                    border: productIcons?.includes(icon) ? "1px solid" : "0",
                    marginRight: "0.5rem",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (productIcons.includes(icon)) {
                      const arr = productIcons.filter((t) => {
                        return t !== icon;
                      });
                      setProductIcons(arr);
                    } else {
                      setProductIcons([...productIcons, icon]);
                    }
                  }}
                >
                  <img
                    src={icon}
                    key={i}
                    alt="/"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="addButton" onClick={handelSubmit}>
        Submit
      </button>
    </div>
  );
};

export default EditProduct;
