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
import noProduct from "../../../assets/noProduct.png"
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import {
  deleteProduct,
  getAllCategoriesAdmin,
  getAllMaterialsAdmin,
  getAllUsersByAdmin,
  getProducts,
} from "../../../services/products/Products";
import { AppContext } from "../../../context";
import Checkbox from "@mui/material/Checkbox";
import EditModal from "./EditModal";
import Loader from "../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const { adminRole } = useContext(AppContext);
  const [getProductData, setGetProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, [currentPage]);

  const getAllUsers = () => {
    setIsLoading(true);
    getAllUsersByAdmin(currentPage, adminRole?.token)
      .then((res) => {
        // console.log(res?.data,"respppppppp");
        if (res.status === 200) {
          const data = res?.data?.data;
          const totalPages = res?.data?.totalPages * 10;
          const totalItems = res?.data?.totalItems;
          const currentPage = res?.data?.currentPage;
          setCurrentPage(currentPage);
          setTotalPages(totalPages);
          setPageSize(totalItems);
          setGetProductData(data);
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

 
  const handlePageChange = (page) => {
    console.log(page, "pagessssssssssssss");
    if (currentPage != page) {
      console.log("hello");
      setCurrentPage(page);
    }
    // console.log(currentPage, "currentPagecurrentPagecurrentPage");
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
              <div className="products-table mt-3">
                {/* <BasicTable/> */}
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Paid</TableCell>
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
                            {item?.name}
                          </TableCell>
                          <TableCell align="center">{item?.email}</TableCell>
                          <TableCell align="center">
                            {item?.phoneNo}
                          </TableCell>
                          <TableCell align="center">
                            {item?.isPaid ? "Paid" : "Unpaid"}
                          </TableCell>
                        </TableRow>
                      
                    ))
                     ) : (
                      <TableRow>
                      <TableCell colSpan={7} align="center">
                        <div className="no-product text-center d-flex align-items-center justify-content-center flex-column mt-5">
                          <img src={noProduct} alt="no product found" className='no-product-found text-muted' /> 
                          <h4 className='text-muted mt-2'>No User Found</h4>
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
    </>
  );
};

export default Users;
