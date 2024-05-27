import React, { useState, useEffect } from "react";
import { BiCloudDownload } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import TextField from "@mui/material/TextField";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import "./addProduct.css";
import { productIcon } from "../../dummyData";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getStyles2(name, purposeName, theme) {
  return {
    fontWeight:
      purposeName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddProduct = () => {
  const navigate = useNavigate();
  const [productIcons, setProductIcons] = useState([]);
  const theme = useTheme();
  const [productFor, setProductFor] = useState([""]);
  const [warningPrecaution, setWarningPrecaution] = useState([""]);
  const [purposeName, setPurposeName] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [product, setProduct] = useState({
    name: "",
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
    contraindication: "",
    actualPrice: "",
    discount: "",
  });
  const [file, setFile] = useState("");

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    const res = await axios.get(
      "https://drcbd-backend-zgqu.onrender.com/product/get_products"
    );
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
      formData.append("cbdByCategory", product.cbdByCategory);
      formData.append("cbdByPurpose", product.cbdByPurpose);
      formData.append("categoryName", categoryName);
      formData.append("purposeName", purposeName);
      formData.append("des", product.des);
      formData.append("productFor", JSON.stringify(productFor));
      formData.append("fda", product.fda);
      formData.append("quantity", product.quantity);
      formData.append("size", product.size);
      formData.append("price", product.price);
      formData.append("actualPrice", product.actualPrice);
      formData.append("discount", product.discount);
      formData.append("dosage", product.dosage);
      formData.append("ingredient", product.ingredient);
      formData.append("suitableFor", product.suitableFor);
      formData.append("use", product.use);
      formData.append("contraindication", product.contraindication);
      formData.append(
        "storageContraindication",
        product.storageContraindication
      );
      formData.append("warningPrecaution", JSON.stringify(warningPrecaution));
      formData.append("productIcons", JSON.stringify(productIcons));
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json", // Set the content type to JSON
        },
      };
      const res = await axios.post(
        "https://drcbd-backend-zgqu.onrender.com/product/add_product",
        formData,
        config
      );
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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (product.cbdByCategory === true) {
      setCategoryName(typeof value === "string" ? value.split(",") : value);
    }
  };
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    if (product.cbdByPurpose === true) {
      setPurposeName(typeof value === "string" ? value.split(",") : value);
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
      <TextField
        id="productName"
        label="Product Name"
        variant="outlined"
        value={product?.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        style={{ width: "25rem" }}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "50%" }}>
          <div
            style={{
              width: "100%",
              padding: "10px 0 5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label>CBD BY CATEGORY</label>
            <input
              onChange={(e) => {
                setProduct({
                  ...product,
                  cbdByCategory: !product.cbdByCategory,
                });
              }}
              type="checkbox"
              style={{ width: "1rem", height: "1rem", marginLeft: "1rem" }}
              checked={product?.cbdByCategory}
            />
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">
                CBD By Category's Category Name
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={categoryName}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="CBD By Category's Category Name"
                  />
                }
                renderValue={(options1) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {options1.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {options1.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, categoryName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <div
            style={{
              width: "50%",
              display: "flex",
              padding: "15px 0 5px",
              alignItems: "center",
            }}
          >
            <label>CBD BY PURPOSE</label>
            <input
              onChange={() => {
                setProduct({ ...product, cbdByPurpose: !product.cbdByPurpose });
              }}
              type="checkbox"
              style={{ width: "1rem", height: "1rem", marginLeft: "1rem" }}
              checked={product?.cbdByPurpose}
            />
          </div>
          <div style={{ width: "100%", padding: "10px 0 5px" }}>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">
                  CBD By Purpose Category Name
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={purposeName}
                  onChange={handleChange2}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="CBD By Purpose Category Name"
                    />
                  }
                  renderValue={(options2) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {options2.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {options2.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles2(name, purposeName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
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
            paddingTop: "20px",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "55%",
          }}
        >
          <TextField
            id="fda"
            label="FDA No."
            variant="outlined"
            value={product?.fda}
            onChange={(e) => setProduct({ ...product, fda: e.target.value })}
            style={{ width: "15rem" }}
          />
          <TextField
            id="fda"
            type="number"
            label="Quantity"
            variant="outlined"
            value={product?.quantity}
            onChange={(e) =>
              setProduct({ ...product, quantity: e.target.value })
            }
            style={{ width: "15rem" }}
          />
          <TextField
            id="size"
            label="Size"
            variant="outlined"
            onChange={(e) => setProduct({ ...product, size: e.target.value })}
            value={product?.size}
            style={{ width: "15rem" }}
          />
          <TextField
            id="price"
            label="Selling price In ฿"
            variant="outlined"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            value={product?.price}
            style={{ width: "15rem" }}
          />
          <TextField
            id="price"
            label="Discount"
            variant="outlined"
            onChange={(e) =>
              setProduct({ ...product, discount: e.target.value })
            }
            value={product?.discount}
            style={{ width: "15rem", marginTop: "1rem" }}
          />
          <TextField
            id="price"
            label="Actual price In ฿"
            variant="outlined"
            onChange={(e) =>
              setProduct({ ...product, actualPrice: e.target.value })
            }
            value={product?.price}
            style={{ width: "15rem", marginTop: "1rem" }}
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
      <label>Storage Condition</label>
      <textarea
        onChange={(e) =>
          setProduct({ ...product, storageContraindication: e.target.value })
        }
        value={product?.storageContraindication}
      />
      <label>Contraindication</label>
      <textarea
        onChange={(e) =>
          setProduct({ ...product, contraindication: e.target.value })
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
                    border: productIcons.includes(icon) ? "1px solid" : "0",
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
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
