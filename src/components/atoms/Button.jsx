import React from "react";

const Button = ({ className = "px-5 py-[14px] text-white", style = {}, children = null, onClick=null }) => {
  return (
    <button
      className={`border-2 rounded-full border-white ${className}`}
      style={style}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
