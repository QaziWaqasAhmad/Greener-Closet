import React, { useContext, useState } from "react";
import Header from "../../components/mainComponent/Header";
import { Avatar } from "@mui/material";
import man from "../../assets/user-image.png";
import { AppContext } from "../../context";
import swal from "sweetalert";
import { cancelSubscription } from "../../services/products/Products";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
const UserProfile = () => {
  const { user,login } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const showAlert = () => {
    swal({
      title: "Are you sure?",
      text: "Once cancelled, you will not be able to get refund of the subscription fee!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleCancelSubscription();
      } else {
        swal("Your subscription is safe!");
      }
    });
  };

  const handleCancelSubscription = () => {
    setIsLoading(true);
    cancelSubscription(user?.userDetails?._id, user?.token)
      .then((res) => {
        setIsLoading(false);
        if (res?.status == 200) {
          toast.success(res?.data?.message);
          let newData = {
            token : user.token,
            userDetails : res?.data?.data
          }
          localStorage.setItem('users', newData)
          login(newData)
        } else {
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
    <Loader isLoading={isLoading}/>
      <div className="contact-section-hero">
        <Header />
      </div>

      <div className="container p-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-8 ">
            <div className="users_detialss bg-white p-5">
              <div className="user-avatar">
                <Avatar
                  style={{
                    width: 180,
                    height: 180,
                    fontSize: "6rem",
                    textTransform: "capitalize",
                  }}
                  className="text-center mx-auto"
                >
                  {user.userDetails.name.charAt(0)}
                </Avatar>
              </div>

              <div className="user-details text-center mx-auto">
                <h2 className="mt-3">{user.userDetails.name}</h2>
                <p>{user.userDetails.email}</p>
                {user.userDetails.isPaid == true ? (
                  <span class="badge status-badge">PAID</span>
                ) : (
                  <span class="badge status-badge">UNPAID</span>
                )}
                {user?.userDetails?.premiumStartDate && (
                  <>
                    <h6 className="fw-bold  head_date mt-4">Starting Date</h6>
                    <input
                      type="text"
                      name="name"
                      className="starting-date"
                      disabled
                      defaultValue={formatDate(
                        user?.userDetails?.premiumStartDate
                      )}
                    />
                  </>
                )}
                {user?.userDetails?.premiumEndDate && (
                  <>
                    <h6 className="fw-bold head_date mt-4">Ending Date</h6>
                    <input
                      type="text"
                      name="name"
                      className="starting-date"
                      disabled
                      defaultValue={formatDate(
                        user?.userDetails?.premiumEndDate
                      )}
                    />
                  </>
                )}
              </div>
              <div className="mx-auto text-center mt-4">
                <button className="cancel-subscription mx-auto" onClick={()=>showAlert()}>
                  Cancel Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-profile p-5 d-none">
        <div className="container">
          {/* <div className="row"> */}
          <div className="user_profile d-flex align-items-center gap-5 ">
            <div className="user-avatar">
              <Avatar style={{ width: 180, height: 180 }}>
                {/* <img src={man} alt="avatar" width={180} height={180} /> */}
                {user.userDetails.name.charAt(0)}
              </Avatar>
            </div>
            <div className="inner-details d-flex align-items-center justify-content-between w-75">
              <div className="user-details">
                <h2>{user.userDetails.name}</h2>
                <p>{user.userDetails.email}</p>
                <div className="d-flex align-items-center gap-2">
                  <div className="d-flex flex-column mt-3">
                    <h6 className="fw-bold">Starting Date</h6>
                    <span className="badge bg-primary fs-6 p-3">
                      {user?.userDetails?.premiumStartDate &&
                        formatDate(user?.userDetails?.premiumStartDate)}
                    </span>
                  </div>
                  <div className="d-flex flex-column mt-3">
                    <h6 className="fw-bold">Expiry Date</h6>
                    <span className="badge bg-primary fs-6 p-3">
                      {user?.userDetails?.premiumEndDate &&
                        formatDate(user?.userDetails?.premiumEndDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="paid-status ">
                {user.userDetails.isPaid == true ? (
                  <div className="payment-status d-flex align-items-center justify-content-center">
                    <h1 className="isPaid">Paid</h1>
                  </div>
                ) : (
                  <h1>Status :UnPaid</h1>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default UserProfile;
