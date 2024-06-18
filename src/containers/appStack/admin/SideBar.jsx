import React, { useState,useEffect } from "react";
import OutLet from "./OutLet";
import Category from "./Category";
import { Avatar, Typography } from "@mui/material";
import man from "../../../assets/user-image.png";
import { Link } from "react-router-dom";
import Material from "./Material";
import Users from "./Users";
import Department from "./Department";
import { isMobile } from "../../../../utils";

const SideBar = () => {
  const [selected,setSelected]=useState("Products")
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  
  useEffect(() => {
    if (isMobile()) {
        alert("For a better experience, please open this website on a desktop.");
    }
}, []);

  return (
    <>
      {/* {screenWidth <= 600 ? (
        <div className="better-view">
          <h3>For better view please login to Desktop or PC</h3>
        </div>
      ) : (
        <> */}
        <div className="sideBar-container mt-4">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center gap-5">
            <div className="col-md-3">
              <div className="main-sideBar d-flex align-items-center justify-content-center flex-column">
               <div className="user">
               <Avatar style={{ width: 180, height: 180 }}>
                  <img src={man} alt="avatar" width={180} height={180} />
                </Avatar>
                <Typography variant="h4" className='text-center mt-2 user-name'>Patrick</Typography>
               </div>
               <div className="pages pt-3 mt-2  text-start w-75 d-flex  flex-column">
                <h5>Preferences:</h5>
                <Link  className={`page-name fw-bold ${selected === 'Products' ? "pageActive" : ''}`} onClick={()=>setSelected("Products")}>Products</Link>
                <Link  className={`page-name fw-bold ${selected === 'Category' ? "pageActive" : ''}`} onClick={()=>setSelected("Category")}>Category</Link>
                <Link  className={`page-name fw-bold ${selected === 'Department' ? "pageActive" : ''}`} onClick={()=>setSelected("Department")}>Department</Link>
                <Link className={`page-name fw-bold ${selected === 'Material' ? "pageActive" : ''}`} onClick={()=>setSelected("Material")}>Material</Link>
                <Link className={`page-name fw-bold ${selected === 'Users' ? "pageActive" : ''}`} onClick={()=>setSelected("Users")}>Users</Link>
               </div>
              </div>
            </div>
            { selected ==="Products" &&
               <div className="col-md-8">
               <OutLet />
             </div>
            }
            { selected ==="Category" &&
               <div className="col-md-8">
               <Category/>
             </div>
            }
            { selected ==="Department" &&
               <div className="col-md-8">
               <Department/>
             </div>
            }
            { selected ==="Material" &&
               <div className="col-md-8">
               <Material/>
             </div>
            }
            { selected ==="Users" &&
               <div className="col-md-8">
               <Users/>
             </div>
            }
          </div>
        </div>
      </div>
        {/* </>
      )} */}
    </>
  );
};

export default SideBar;
