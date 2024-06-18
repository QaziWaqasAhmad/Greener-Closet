import React, { useContext, useEffect, useState } from "react";
import BasicTable from "./Table";
import TransitionsModal from "./Modal";
import FullScreenDialog from "./Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import noProduct from "../../../assets/noProduct.png"
import { Pagination } from "antd";
import {
  deleteProduct,
  getAllCategoriesAdmin,
  getAllDepartmentsAdmin,
  getAllMaterialsAdmin,
  getProducts,
} from "../../../services/products/Products";
import { AppContext } from "../../../context";
import Checkbox from "@mui/material/Checkbox";
import EditModal from "./EditModal";
import Loader from "../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
import NoProduct from "../../../components/NoProduct";
const OutLet = () => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const { adminRole } = useContext(AppContext);
  const [getProductData, setGetProductData] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategoires] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    getAllProducts();
  }, [currentPage]);

  useEffect(() => {
    getAllCategoriesByAdmin();
    getAllMaterialsByAdmin();
    getAllDepartmentsByAdmin();
  }, []);


  const showAlert=()=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover these products!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        handleDeleteProducts()
  
      } else {
        swal("Your products are safe!");
      }
    });
  }
  const getAllProducts = () => {
    setIsLoading(true);
    getProducts(currentPage, adminRole?.token)
      .then((res) => {
        if (res.status === 200) {
          const data = res?.data?.data;
          const totalPages = res?.data?.totalPages * 10;
          const totalItems = res?.data?.totalItems;
          const currentPage = res?.data?.currentPage;
          setCurrentPage(currentPage);
          setTotalPages(totalPages);
          setPageSize(totalItems);

          setGetProductData(data);
          setIsAllChecked(false);
          setSelectedProducts([]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Something went wrong");
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handlePageChange = (page) => {
    console.log(page, "pagessssssssssssss");
    if (currentPage != page) {
      console.log("hello");
      setCurrentPage(page);
    }
    console.log(currentPage, "currentPagecurrentPagecurrentPage");
  };

  const myProduct = getProductData.find(
    (product) => product._id === selectedProducts[0]
  );

  // console.log(myProduct, "MYProductttttttttttt");
  const handleAllCheck = () => {
    setIsAllChecked(!isAllChecked);
    if (isAllChecked) {
      let tempArr = [];
      setSelectedProducts(tempArr);
    } else {
      let tempArr = [];
      getProductData.map((item, ind) => {
        tempArr.push(item?._id);
      });
      setSelectedProducts(tempArr);
    }
  };

  const handleSelectItem = (id) => {
    if (selectedProducts.includes(id)) {
      const selectedArr = selectedProducts.filter(
        (productId) => productId !== id
      );
      setSelectedProducts(selectedArr);
    } else {
      const selectedArr = [...selectedProducts, id];
      setSelectedProducts(selectedArr);
    }
  };

  const handleDeleteProducts = () => {
    const body = { ids: selectedProducts };
    setIsLoading(true);
    deleteProduct(body, adminRole?.token)
      .then((res) => {
        if (res?.status == 200) {
          getAllProducts();
          setIsLoading(false);
          toast.success(res?.data?.message);
        } else {
          setIsLoading(false);
          toast.error(res?.data?.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Something went wrong");
      });
  };

  const getAllCategoriesByAdmin = () => {
    setIsLoading(true);
    getAllCategoriesAdmin(adminRole?.token)
      .then((res) => {
        if (res?.status == 200) {
          setIsLoading(false);
          setCategoires(res?.data?.data);
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  const getAllDepartmentsByAdmin = () => {
    setIsLoading(true);
    getAllDepartmentsAdmin(adminRole?.token)
      .then((res) => {
        if (res?.status == 200) {
          setIsLoading(false);
          setDepartments(res?.data?.data);
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const getAllMaterialsByAdmin = () => {
    setIsLoading(true);
    getAllMaterialsAdmin(adminRole?.token)
      .then((res) => {
        if (res?.status == 200) {
          setIsLoading(false);
          let data = res?.data?.data;
          let newArr = data?.map((material) => material?.name);
          setMaterials(newArr);
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  

  return (
    <>
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
       {/* {screenWidth < 600  ? (
        <>
        <h1>hello world</h1>
        </>
        
       ) : (
        <> */}
        <div className="outlet-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-buttons d-flex align-items-center justify-content-end gap-2">
                <button className="add-product" onClick={handleClickOpen}>
                  Add Products
                </button>
                {selectedProducts?.length > 0 && (
                  <button
                    className="delete-product"
                    onClick={showAlert}
                  >
                    Delete Products
                  </button>
                )}
                {selectedProducts?.length == 1 ? (
                  <button
                    className="edit-product delete-product"
                    onClick={handleClickOpenEdit}
                  >
                    Edit Products
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="products-table mt-3">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Checkbox
                            checked={isAllChecked}
                            onClick={() => handleAllCheck()}
                          />
                        </TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Brand</TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">Department</TableCell>
                        <TableCell align="center">Score</TableCell>
                        <TableCell align="center">Image</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {getProductData?.length > 0 ? (
                        getProductData?.map((item, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              <Checkbox
                                checked={selectedProducts.includes(item?._id)}
                                onClick={() => handleSelectItem(item?._id)}
                              />
                            </TableCell>
                            <TableCell 
                              component="th"
                              scope="row"
                              align="center"
                            >
                              { item?.name?.length > 25 ? item?.name?.slice(0,25) +'...' : item ?.name}
                            </TableCell>
                            <TableCell align="center">{ item?.brand?.length > 25 ? item?.brand?.slice(0,25) +'...' : item ?.brand}</TableCell>
                            <TableCell align="center">
                              {item?.category}
                            </TableCell>
                            <TableCell align="center">
                              {item?.department}
                            </TableCell>
                            <TableCell align="center">
                              {parseInt(item?.score).toFixed(2)}/100
                            </TableCell>
                            <TableCell align="center">
                              <div className="products_images ">
                                <Link to={item?.images[0]} target="_blank">
                                  <img
                                    src={item?.images[0]}
                                    alt="product image"
                                    className="table-image rounded-circle"
                                    height={"40px"}
                                    width={"40px"}
                                  />
                                </Link>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <div className="no-product text-center d-flex align-items-center justify-content-center flex-column mt-5">
                              <img src={noProduct} alt="no product found" className='no-product-found text-muted' /> 
                              <h4 className='text-muted mt-2'>No Products Found</h4>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  className="pagination"
                  // total={totalPages}
                  defaultCurrent={currentPage}
                  total={totalPages}
                  current={currentPage}
                  onChange={(page) => {
                    handlePageChange(page);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* </>
       )} */}
      <FullScreenDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        getAllProducts={getAllProducts}
        categories={categories}
        names={materials}
        departments={departments}
      />
      <EditModal
        handleClickOpen={handleClickOpenEdit}
        handleClose={handleCloseEdit}
        open={openEdit}
        setOpen={setOpenEdit}
        data={myProduct}
        getAllProducts={getAllProducts}
        categories={categories}
        names={materials}
        departments={departments}
      />


        
    </>
  );
};

export default OutLet;
