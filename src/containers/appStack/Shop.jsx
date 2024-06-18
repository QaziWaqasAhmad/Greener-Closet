import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/mainComponent/Header";
import ProductHomeSection from "../../components/ProductHomeSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fundamentals from "../../components/Fundamentals";
import BestSellingProducts from "../../components/BestSellingProducts";
import cloth1 from "../../assets/cloth1.jpg";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import shirt from "../../assets/shirt.jpeg"
import CategorySlider from "../../components/CategorySlider";
import { useLocation, useNavigate } from "react-router-dom";
import { clientProducts, getMaterial } from "../../services/products/Products";
import LockIcon from "@mui/icons-material/Lock";
import { AppContext } from "../../context";
import { Pagination } from "antd";
import NoProduct from "../../components/NoProduct";
import Loader from "../../components/Loader";

const Shop = () => {
  const [showPolyester, setShowPolyester] = useState(true);
  const { user } = useContext(AppContext);
  const [product, setProduct] = useState([]);
  const [material, setMaterial] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [selectedCategory, setSelectedCatgory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { search } = location.state || {}; // Destructure the state

  // console.log(search,"serachhhhhhhhhhhhhhhhhhhh");
  useEffect(() => {
    if (search) {
      handleMaterials();
      handleSearchMaterial(search);
    } else {
      handleMaterials();
      handleProducts();
    }
  }, [currentPage,search]);

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

  const handleProducts = () => {
    setIsLoading(true);
    clientProducts(null, null, currentPage)
      .then((res) => {
        if (res?.status === 200) {
          const data = res?.data?.data;
          const totalPages = res?.data?.totalPages * 10;
          const totalItems = res?.data?.totalItems;
          const currentPage = res?.data?.currentPage;
          setProduct(data);
          setCurrentPage(currentPage);
          setTotalPages(totalPages);
          setPageSize(totalItems);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const toggleSection = () => {
    setShowPolyester(!showPolyester);
  };

  const navigate = useNavigate();
  const handleSingleProduct = (productId) => {
    navigate(`/product/${productId}`, { state: { productId } });
  };

  const handleSelectMaterial = (e) => {
    if (selectedCategory !== null) {
      const selectedValue = e.target.value;
      setSelectedMaterial(selectedValue);
      clientProducts(selectedValue, selectedCategory, currentPage)
        .then((res) => {
          const data = res?.data?.data;
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // console.log("innnnnnnnnnnnnnnnnnnnnnnnnn");
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

  const handleSearchMaterial = (material) => {
    if (selectedCategory !== null) {
      const selectedValue = material;
      setSelectedMaterial(selectedValue);
      clientProducts(selectedValue, selectedCategory, currentPage)
        .then((res) => {
          const data = res?.data?.data;
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // console.log("innnnnnnnnnnnnnnnnnnnnnnnnn");
      const selectedValue = material;
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
  const handleSelectCategory = (name) => {
    if (selectedMaterial !== null) {
      setSelectedCatgory(name);
      clientProducts(selectedMaterial, name, currentPage)
        .then((res) => {
          const data = res?.data?.data;
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSelectedCatgory(name);
      clientProducts(null, name)
        .then((res) => {
          const data = res?.data?.data;
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePageChange = (page) => {
    // console.log(page, "pagessssssssssssss");
    if (currentPage != page) {
      // console.log("hello");
      setCurrentPage(page);
    }
    // console.log(currentPage, "currentPagecurrentPagecurrentPage");
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="shop-container">
        <div className="contact-header">
          <Header />
        </div>
        <div className="shop-hero-section d-none">
          <div className="shop-inner text-center d-flex align-items-center justify-content-center gap-2 d-none">
            <HomeIcon className="fs-1 home-icon pb-2" />
            <h4>
              Home
              <span>
                <KeyboardDoubleArrowRightIcon />
              </span>
            </h4>
            <h2>Products</h2>
          </div>
        </div>

        <div className="productHome polyester mt-5 section-height d-flex align-items-center justify-content-center flex-column p-5">
          <CategorySlider
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
          />
          <div className="productHead shop_page_content d-flex align-items-center justify-content-center flex-column">
            {search ? 
              <h2 className="margin-left">Search result of {search}</h2>
              :
              <h2 className="margin-left">Products with lowest Price</h2>
          }
            
            <select
              class="form-select  w-75 mt-2"
              aria-label="Default select example"
              onChange={handleSelectMaterial}
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
              {product?.length > 0 ? (
                <>
                  {product?.map((product, index) => (
                    <div className="col-md-3" key={index}>
                      <div
                        class="card shop_card mb-3"
                        style={{ width: "17rem" }}
                      >
                        <div className="product-photo card-images">
                          <img
                            src={product.images[0]}
                            class="card-img-top"
                            alt="shirt"
                          />
                        </div>
                        <div class="card-body p-3">
                          <div className="d-flex align-items-center">
                            <h5 class="card-title">
                              {product?.name?.slice(0, 18)}
                            </h5>
                          </div>
                          <span className="fw-bold fs-6 text-dark">
                            <span className="text-success">Brand </span>:{" "}
                            <span className="fw-light">
                              {product?.brand?.slice(0, 10)}
                            </span>
                          </span>
                          <div className="d-flex align-items-center justify-content-between pt-2">
                            <small class="card-text para">
                              {product?.category}
                            </small>
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
                  <Pagination
                    className="pagination"
                    defaultCurrent={currentPage}
                    total={totalPages}
                    current={currentPage}
                    onChange={(page) => {
                      handlePageChange(page);
                    }}
                  />
                </>
              ) : (
                <>
                  <NoProduct />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mb-5 mt-5"></div>
      </div>
    </>
  );
};

export default Shop;
