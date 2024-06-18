import React, { useContext, useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import women from "../assets/women.jpg"
import women from "../assets/women.jpg";
import { AppContext } from "../context";
import LockIcon from "@mui/icons-material/Lock";
import { clientProducts, getMaterial } from "../services/products/Products";
import { Link, useNavigate } from "react-router-dom";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Loader from "./Loader";
import NoProduct from "./NoProduct";

const BestSellingProducts = () => {
  const { user } = useContext(AppContext);
  const [product, setProduct] = useState([]);
  const [material, setMaterial] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const[isLoading,setIsLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)


  useEffect(() => {
    handleProducts();
    handleMaterials();
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const navigate = useNavigate();
  const handleSingleProduct = (productId) => {
    navigate(`/product/${productId}`, { state: { productId } });
  };

  const handleProducts = () => {
    setIsLoading(true)
    clientProducts()
      .then((res) => {
        const data = res?.data?.data;
        setProduct(data);
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error);
      });
  };
  const handleMaterials = () => {
    getMaterial()
      .then((res) => {
        const data = res?.data?.data;
        setMaterial(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectMaterial = (e) => {
    if (selectedCategory !== null) {
      const selectedValue = e.target.value;
      setSelectedMaterial(selectedValue);
      clientProducts(selectedValue, selectedCategory)
        .then((res) => {
          const data = res?.data?.data;
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const selectedValue = e.target.value;
      setSelectedMaterial(selectedValue);
      clientProducts(selectedValue, selectedCategory)
        .then((res) => {
          const data = res?.data?.data;
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const limitedProducts = product?.slice(0, 7);

  return (
    <>
     <Loader isLoading={isLoading}/>
      <div className="productHome polyester section-height d-flex align-items-center justify-content-center flex-column p-5">
        <div className="productHead d-flex align-items-center justify-content-center">
          <h2 className="margin-left">
            Best Selling <span className="navy-color">Products</span>
          </h2>
          <select
            class="form-select d-none"
            aria-label="Default select example"
            onChange={(e) => handleSelectMaterial(e)}
          >
            <option value={"all"}>All</option>
            {material?.map((item, index) => (
              <option key={index} value={item.name}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="container mt-5">
          <div className="row  d-flex align-items-center justify-content-center">
            <div className="col-md-3 d-none">
            {isOnline && (
              <div class="card product-card first-card p-3 d-none d-md-block">
              <div class="card-body"> 
                <p class="card-text para">
                  Make better choices by using our scoring system that
                  determines the amount of harming microplastics in products.
                </p>
                <div className="card_buttons d-flex align-items-center justify-content-center "> 
                  <button className="product-view">View All</button>  
                </div>
              </div>
            </div>
             )}

              <div
                class="card shop_card color-card mb-3"
                style={{ width: "17rem" }}
              >
                <div class="card-body p-4">
                  <p class="card-text para">
                    Make better choices by using our scoring system that
                    determines the amount of harming microplastics in products.
                  </p>
                  <div className="card_buttons d-flex align-items-center justify-content-center ">
                    <button className="product-view">View All</button>
                  </div>
                </div>
              </div>
            </div>
             {limitedProducts?.length > 0 ? (
              <>
    {limitedProducts?.map((product, index) => ( 
  <div className="col-12 col-md-3" key={index}>
    <div class="card shop_card  mb-3" style={{ width: "17rem" }}>
      <div className="product-photo card-images">
        <img
          src={product?.images[0]}
          class="card-img-top"
          alt="shirt"
        />
      </div>
      <div class="card-body p-3">
        <div className="d-flex align-items-center">
          <h5 class="card-title">{product?.name?.slice(0, 18)}</h5>
        </div>
        <span className="fw-bold fs-6 text-primary">
        <span className="text-success">Brand </span>: <span className="fw-light">{product?.brand?.slice(0,10)}</span>
        </span>
        <div className="d-flex align-items-center justify-content-between pt-2">
          <small class="card-text para">{product?.category}</small>
          {user && user?.userDetails?.isPaid === true ? (
            <div className="d-flex align-items-center">
              <small className="fw-bold fs-6">
              {parseInt(product?.score).toFixed(2)}
              </small>
              <small className="">/100</small>
            </div>
          ) : (
            <>
              <div className="d-flex align-items-center">
                <LockIcon className="fs-6 text-primary" />
                <small className="">/100</small>
              </div>
            </>
          )}
        </div>
        <div className="card_buttons d-flex align-items-center justify-content-center mt-3">
          <button
            className="buy-now hover-btn"
            onClick={() => handleSingleProduct(product._id)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  </div>
))}

<div className="view-all-products text-center mt-3 d-none">
 <Link to='/Shop'>
 <button className="veiw-all-products">
    View All Products
    <i class="fa-solid fa-shop m-1 icon-color"></i>
  {/* <ProductionQuantityLimitsIcon className="text-center m-1"/> */}
    </button>
 </Link>
</div>
</>
             ): (
               <>
               <NoProduct/>
               </>
             )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellingProducts;
