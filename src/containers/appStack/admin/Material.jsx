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
  deleteCategory,
  deleteMaterial,
  deleteProduct,
  getAllCategories,
  getAllMaterials,
  getProducts,
} from "../../../services/products/Products";
import { AppContext } from "../../../context";
import Checkbox from "@mui/material/Checkbox";
import EditModal from "./EditModal";
import Loader from "../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import CategoryModal from "./CategoryModal";
import CategoryEditModal from "./CategoryEditModal";
import MaterialModal from "./MaterialModal";
import MaterialEditModal from "./MaterialEditModal";
import swal from "sweetalert";
const Material = () => {
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

  useEffect(() => {
    getAllProducts();
  }, [currentPage]);

  const getAllProducts = () => {
    setIsLoading(true);
    getAllMaterials(currentPage, adminRole?.token)
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

  
  const showAlert=()=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover these materials and it will effect the products of these materials!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        handleDeleteProducts()
  
      } else {
        swal("Your materials are safe!");
      }
    });
  }
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
    deleteMaterial(body, adminRole?.token)
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
      <div className="outlet-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="product-buttons d-flex align-items-center justify-content-end gap-2">
                <button className="add-product" onClick={handleClickOpen}>
                  Add Material
                </button>
                {selectedProducts?.length > 0 && (
                  <button
                    className="delete-product"
                    onClick={showAlert}
                  >
                    Delete Materials
                  </button>
                )}
                {selectedProducts?.length == 1 ? (
                  <button
                    className="edit-product delete-product"
                    onClick={handleClickOpenEdit}
                  >
                    Edit Material
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="products-table mt-3">
                {/* <BasicTable/> */}
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
                        <TableCell align="center">Material Name</TableCell>
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
                              {item?.name}
                            </TableCell>
                          </TableRow>
                        
                      ))
                       ) : (
                        <TableRow>
                        <TableCell colSpan={7} align="center">
                          <div className="no-product text-center d-flex align-items-center justify-content-center flex-column mt-5">
                            <img src={noProduct} alt="no product found" className='no-product-found text-muted' /> 
                            <h4 className='text-muted mt-2'>No Material Found</h4>
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
      <MaterialModal
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        getAllCategories={getAllProducts}
      />
      <MaterialEditModal
        handleClickOpen={handleClickOpenEdit}
        handleClose={handleCloseEdit}
        open={openEdit}
        setOpen={setOpenEdit}
        data={myProduct}
        getAllCategories={getAllProducts}
      />
    </>
  );
};

export default Material;
