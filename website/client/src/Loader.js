import React from "react";
import ReactLoading from "react-loading";

const Loader = () => (
  <div className="loader">
    <ReactLoading type={"spokes"} color={"#004225"} height={75} width={75} />
  </div>
);

export default Loader;
