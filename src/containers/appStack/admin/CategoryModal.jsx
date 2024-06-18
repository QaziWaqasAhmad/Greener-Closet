import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import { AppContext } from "../../../context";
import Loader from "../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { createCategory } from "../../../services/products/Products";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function CategoryModal({
  handleClickOpen,
  handleClose,
  open,
  setOpen,
  getAllCategories,
}) {

  const { adminRole } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [category,setCategory]=React.useState("");


  

  const handleAddCeheck=()=>{
      if (!category || category.trim() === "") {
        toast.error("Valid name is requied")
      }else{
      const body={name:category}
      createCategory(body,adminRole.token).then((response)=>{
        console.log(response);
        if (response?.status==200) {
          setIsLoading(false)
          setCategory("");
          handleClose();
          toast.success(response?.data?.message)
          getAllCategories();
        }else{
          setIsLoading(false)
          toast.error(response?.data?.message)
        }
      }).catch((error)=>{
        console.log(error,"errrrrrrrrrrr");
        toast.error("Something went wrong")
        setIsLoading(false)
      })
    }
  }

  
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
   
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <div className="-category_modal">
          <div className="modal-top d-flex align-items-center justify-content-between p-3">
          <h5 className="text-white">ADD CATEGORY</h5>
          <div onClick={handleClose}>
          <CloseIcon className="text-white category-cross-btn"/>
          </div>
          </div>
          <div className="product-name mb-3 mt-3 p-4">
                    <label className="mb-2">Category Name</label>
                    <input
                      type="text"
                      id="category"
                      className="form-control productName-field w-100"
                      name="category"
                      value={category}
                      onChange={(e)=>setCategory(e.target.value)}

                    />
                  </div>
                  <div className="category-add-button mt-3 mb-3 text-center">
                  <button className="add_category" onClick={handleAddCeheck}>
                    Add
                  </button>
                </div>
         </div>
        </Box>
      </Modal>
    </div>
    </>
  );
}
