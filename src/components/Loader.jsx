import { useState } from "react";
import  SyncLoader  from "react-spinners/SyncLoader";
// import ClipLoader from "react-spinners/ClipLoader";



const Loader=({isLoading})=>{
  let [color, setColor] = useState("#fff");

  return (
    <div className="loader" style={{ display: isLoading ? "flex" : "none" }}>
      <SyncLoader
        color={color}
        loading={isLoading}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}


export default Loader


