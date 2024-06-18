import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TagsChips from "./TagsChips";
import MainImage from "../../../assets/first.png";
import { addProducts, calculateScore } from "../../../services/products/Products";
import { ErrorOutline } from "@mui/icons-material";
import MultipleSelectCheckmarks from "../../../components/Select";
import BasicSelect from "../../../components/CategorySelect";
import { AppContext } from "../../../context";
import { useRef } from "react";
import axios from "axios";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Loader from "../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import SimpleSelectCheckmarks from "../../../components/SimpleSelect";
// import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  handleClickOpen,
  handleClose,
  open,
  setOpen,
  getAllProducts,
  categories,
  names,
  departments
}) {
  const { adminRole } = React.useContext(AppContext);
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [addProduct, setAddProduct] = React.useState({
    name: "",
    price: "",
    brand: "",
    department:"",
    description: "",
    category: "",
    refferalLink: "",
    tags: [
      {
        name: "",
      },
    ],
    images: [],
  });

  const handleImage = async (e) => {
    setIsLoading(true);
    const form = new FormData();
    const newFiles = e.target.files;

    for (let index = 0; index < newFiles?.length; index++) {
      form.append("image", newFiles[index]);
    }

    try {
      let res = await axios.post("https://amberstore.pk/upload.php", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imagesUrl = res?.data?.url;
      const newArr = addProduct.images;
      newArr.push(imagesUrl);
      setAddProduct({
        ...addProduct,
        images: newArr,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error, "errorrrrrrrrrrrrrrrrrrrrrr");
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };

  const [material, setMaterial] = React.useState([]);

  const [materialQuantities, setMaterialQuantities] = React.useState({});
  const handleMaterialQuantityChange = (material, quantity) => {
    console.log("jdkjdkjdkjkjdjkj");
    setMaterialQuantities({
      ...materialQuantities,
      [material]: quantity,
    });
  };

  const createProduct = (score) => {
    const { name, description, category, refferalLink, images,brand,department } =
      addProduct;
      const body = {
        name,
        description: description,
        category,
        refferalLink,
        department,
        brand,
        images: images,
        material,
        score:score,
        materialQuantity:materialQuantities,
      };
      setIsLoading(true);
      addProducts(body, adminRole.token)
        .then((res) => {
          // console.log(res, "resssssssssssss");
          if (res?.status == 200) {
            setIsLoading(false);
            setAddProduct({
              name: "",
              price: "",
              description: "",
              category: "",
              brand:"",
              department:"",
              refferalLink: "",
              tags: [
                {
                  name: "",
                },
              ],
              images: [], 
            });
            setMaterial([]);
            handleClose();
            getAllProducts();
            setIsLoading(false);
            setMaterialQuantities({})
          } else {
            toast.error(res?.data?.message);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          toast.error("Something went wrong");
          setIsLoading(false);
        });
  };

  const handleOnChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]: e.target.value,
    });
  };


  
  const removeImage = (index) => {
    const imageRemove = addProduct.images;
    imageRemove.splice(index, 1);
    // console.log(imageRemove, "imageARRRYYYYYYYYYYYYYYYY");
    setAddProduct({
      ...addProduct,
      images: imageRemove,
    });
  };


  // console.log(
  //   materialQuantities,
  //   "materialQuantitiesmaterialQuantitiesmaterialQuantities"
  // );

  const handleCalculateScore = () => {
    const { name, description, category, refferalLink, images,brand,department } =
      addProduct;
    if (!name || name.trim() === "") {
      toast.error("Product name is required");
      return;
    }
    if (!brand || brand.trim() === "") {
      toast.error("Brand name is required");
      return;
    }
    if (!description || description.trim() === "") {
      toast.error("Product description is required");
      return;
    }
    if (!category || category.trim() === "") {
      toast.error("Product category is required");
      return;
    }
    if (!department || department.trim() === "") {
      toast.error("Product department is required");
      return;
    }
    if (!refferalLink || refferalLink.trim() === "") {
      toast.error("Product referral link is required");
      return;
    }
    if (!images || !Array.isArray(images) || images?.length === 0) {
      toast.error("At least one product image is required");
      return;
    }
    if (!material || !Array.isArray(material) || material?.length === 0) {
      toast.error("Product material is required");
      return;
    } if (!materialQuantities || typeof materialQuantities !== 'object' || Object.keys(materialQuantities)?.length === 0) {
      toast.error("Product materials proportion is required");
      return;
    } else {
      const materialComposition = [];

      // Iterate through the object and push the formatted data into the array
      for (const [material, proportion] of Object.entries(materialQuantities)) {
        materialComposition.push({
          material: material,
          proportion: (proportion / 100).toFixed(2)  ,
        });
      }
      const body={
        materialComposition:materialComposition
      }
      // console.log(body,"bodyyyyyyyyyyyyy");
      calculateScore(body).then((res)=>{
        if (res?.status==200) {
          console.log(res?.data,"datttttttttttttttttttttttt");
          let score=res?.data?.data
          createProduct(score)

        }
      }).catch((error)=>{

      })
    }
    
  };

  // const categories = [
  //   {
  //     id: "28337873",
  //     name: "Shirt",
  //   },
  //   {
  //     id: "28337873",
  //     name: "Pent",
  //   },
  // ];

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Loader isLoading={isLoading} />

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick
          // rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <AppBar sx={{ position: "relative", backgroundColor: "#077296" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Product
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              ADD
            </Button>
          </Toolbar>
        </AppBar>
        <div className="container  mt-2 p-2">
          <div className="row">
            <div className="col-md-8">
              <div className="input-fields">
                <div className="input-fields d-flex align-items-center gap-4">
                  <div className="product-name mb-3 mt-3">
                    <label className="mb-2">Product Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control productName-field"
                      name="name"
                      value={addProduct?.name}
                      onChange={(e) => handleOnChange(e)}
                      maxLength={60}
                    />
                  </div>
                  <div className="product-name mb-3 mt-3">
                    <label className="mb-2">Product Brand</label>
                    <input
                      type="text"
                      id="brand"
                      className="form-control productName-field"
                      name="brand"
                      value={addProduct?.brand}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                </div>
                <div className="input-fields d-flex align-items-center gap-4">
                  {/* <div className="product-name mb-3 mt-3">
                        <label className='mb-2'>Tags</label>
                        <input
                          type="text"
                          id="tags"
                          className="form-control productName-field"
                          name="tags"
                          // value={addProduct.name}
                          // onChange={(e)=>handleOnChange(e)}
                        />
                      </div> */}
                  <div className="product-name mb-3 mt-3">
                    <label className="mb-2">Refferal Link</label>
                    <input
                      type="text"
                      id="refferelLink"
                      className="form-control productName-field"
                      name="refferalLink"
                      value={addProduct?.refferalLink}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                  <div className="product-name mb-3 mt-3">
                    <label className="mb-2">Product Category</label>
                    {/* <input
                          type="text"
                          id="productCategory"
                          className="form-control productName-field"
                          name="productCategory"
                        /> */}
                    <BasicSelect
                      handleOnChange={handleOnChange}
                      value={addProduct?.category}
                      categories={categories}
                      name="category"
                      label="Select Category"
                    />
                  </div>
                  </div>
                <div className="input-fields d-flex align-items-center gap-4">
                <div className="product-name mb-3 mt-3">
                    <label className="mb-2">Product Department</label>
                    {/* <input
                          type="text"
                          id="productCategory"
                          className="form-control productName-field"
                          name="productCategory"
                        /> */}
                    <BasicSelect
                      handleOnChange={handleOnChange}
                      value={addProduct?.department}
                      categories={departments}
                      name="department"
                      label="Select Department"
                      
                    />
                  </div>
                  <div className="product-name mb-3 mt-3">
                    <label className="mb-3">Product Material</label>
                    {/* <input
                          type="select"
                          id="productMaterial"
                          className="form-control productName-field"
                          name="material"
                          value={addProduct.material[0]}
                          onChange={(e)=>handleOnChange(e)}
                        /> */}
                    <SimpleSelectCheckmarks
                      names={names}
                      material={material}
                      setMaterial={setMaterial}
                    />

                    {material?.map((mat, index) => (
                      <div
                        className="input-fields d-flex align-items-center gap-4"
                        key={index}
                      >
                        <div className="product-name mb-3 mt-3">
                          <label className="mb-2">{`${mat} Proportion`}</label>
                          <input
                            type="text"
                            id={`${mat}-quantity`}
                            className="form-control productName-field"
                            name={`${mat}-quantity`}
                            value={materialQuantities[mat] || ""}
                            onChange={(e) =>
                              handleMaterialQuantityChange(mat, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="product-description mb-6 mt-3">
                    <label className="mb-2">Product Description</label>
                    <textarea
                      className="form-control productName-field textarea-field"
                      id="productDescription"
                      rows="3"
                      name="description"
                      value={addProduct.description}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                <div className="product-add-button mt-3 text-center">
                  <button
                    className="add_product"
                    onClick={handleCalculateScore}
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="product-image">
                <label> Image Gallery</label>
                {addProduct?.images.length == 4 ? (
                  <div
                    className="upload-image mt-3"
                  >
                    <img
                      src={addProduct?.images[0]}
                      alt="product-image"
                      className="cloth-image"
                    />
                  </div>
                ) : (
                  <div
                    className="upload-image mt-3"
                    onClick={() => imageRef.current.click()}
                  >
                    <AddAPhotoIcon className="upload-icon" />
                  </div>
                )}

                <div className="inner-images d-flex align-items-center justify-content-center gap-3">
                  {addProduct?.images?.map((image, index) => (
                    <div className="product-main-image mt-2" key={index}>
                      <img
                        src={image}
                        alt="product-image"
                        className="second-cloth-image"
                      />
                      <CloseIcon
                        className="bg-danger"
                        onClick={() => removeImage(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          accept="image/png, image/jpeg"
          type="file"
          ref={imageRef}
          style={{ visibility: "hidden", height: "0" }}
          onChange={handleImage}
          data={"Category"}
        />
      </Dialog>
    </React.Fragment>
  );
}
