
import { Link } from "react-router-dom";

function Auth({ type,title, fields = [], buttonText, linkText, linkText2, onSubmit }: any) {
const pathto = type === "register" ? "/" : "/register";
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    onSubmit && onSubmit(formData);
  };

  return (
    <div>
      <h1>{title}</h1>

      <form onSubmit={handleSubmit}>
        {fields.map((f: any) => (
          <div key={f.name}>
            <label>{f.label}</label>
            <input type={f.type} placeholder={f.placeholder} name={f.name} />
          </div>
        ))}

        <button type="submit">{buttonText}</button>
      </form>

      {linkText && <p><Link to={pathto}>{linkText}</Link></p>}
      {linkText2 && <p><Link to="/forgot">{linkText2}</Link></p>}
    </div>
  );
}

export default Auth;
