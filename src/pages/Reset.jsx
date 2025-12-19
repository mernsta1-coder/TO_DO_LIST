import React from "react";
import Auth from "../components/Auth";

function Reset() {
  return (
    <Auth
      type="reset"
      title="Reset your Password"
      buttonText="Set Password"
      fields={[
        {
          label: "Password:",
          type: "password",
          name: "password",
          placeholder: "Enter your password",
        },
        {
          label: "Confirm Password:",
          type: "password",
          name: "confirmPassword",
          placeholder: "Enter your password",
        },
      ]}
    />
  );
}

export default Reset;
