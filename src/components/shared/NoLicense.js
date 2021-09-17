import React from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const NoLicense = () => {
  return <ThemeContext.Consumer>
    {({ isdark }) => { 
      return <div>
        Bạn không có quyền truy cập trang này.
      </div>
    }}
  </ThemeContext.Consumer>
}

export default NoLicense;