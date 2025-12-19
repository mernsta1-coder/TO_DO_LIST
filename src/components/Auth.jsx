import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

function Auth({ type, title, fields = [], buttonText, linkText, linkText2, onSubmit, textLabel, onClick, pattern }) {
  const [showpassword, setshowpassword] = useState(false);
  const [confirm,setconfirm] = useState(false);

  const pathto = type === "register" ? "/" : "/register";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (onSubmit) onSubmit(formData);
  }


  return (
    <div className="min-h-200px w-70 mt-25 bg-[radial-gradient(circle,_rgba(238,174,202,1)_0%,_rgba(148,187,233,1)_100%)]  m-auto rounded-2xl">
      <h1 className="text-white text-center text-2xl font-bold">{title}</h1>

      <form onSubmit={handleSubmit}>
        {fields.map((f) => (
          <div key={f.name} className=" ">
            <div className="block text-center">
              <div className="relative inline-block text-center mt-2">
                <input
                  type={f.name === "password" ? (showpassword? "text" : "password"):
                    f.name ==="confirmpassword"?(confirm?"text" : "password") : f.type }
                  placeholder={f.placeholder} name={f.name}
                  mi  nLength={f.minLength} maxLength={f.maxlength}
                  pattern={f.pattern} required={f.required}
                  className="border-b-2 rounded-xl w-60 mt-2 text-white text-center" />

                {(f.name === "password" ||f.name === "confirmpassword") && (
                  <span
                    onClick={() => f.name === "password"?setshowpassword(!showpassword):setconfirm(!confirm)}
                    
                    className="absolute right-2 top-2 cursor-pointer text-white mt-1"
                  >
                    <FaEye />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className=" text-center block mt-4">

          <button type="submit" onClick={onClick} className="text-white bg-blue-600 p-1 pl-2 pr-2 rounded-r-sm">{buttonText}</button>

        </div>
      </form>

      {linkText && (
        <p className="text-white m-3">
          <p className=" inline">{textLabel}</p><Link to={pathto} className="text-blue-600">{linkText}</Link>
        </p>
      )}

      {linkText2 && (
        <p className="text-white m-4 pb-2">
          <Link to="/forgot" className="text-blue-600">{linkText2}</Link>
        </p>
      )}
    </div>
  );
}

export default Auth;
