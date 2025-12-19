import React from "react";
import Auth from "../../components/Auth";
import { useNavigate } from "react-router-dom";
function Forgot() {
  const navigate = useNavigate();
  const Back = ()=>{
    navigate("/")

  }
  return (<>
    <Auth
      type="forgot"
      title="Forgot Password"
      buttonText="Submit"
      fields={[
        {
          label: "Enter Email:",
          type: "Email",
          name: "mail",
          placeholder: "Enter your email",
        },
      ]}
    />
    <input type="button" value="back" onClick={Back}/>
    </>
  );
}

export default Forgot;
