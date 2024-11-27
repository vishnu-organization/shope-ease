import { Button } from "@mui/material";
import { useState } from "react";

const fields = [
  {
    name: "name",
    type: "text",
    placeholder: "Enter Your Name",
    label: "Name",
    rules: "required|string",
    value: "",
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Enter Your Last Name",
    label: "Last Name",
    rules: "required|string",
    value: "",
  },
  {
    name: "phoneNumber",
    type: "number",
    placeholder: "Enter Your Phone Number",
    label: "Phone Number",
    rules: "required|string",
    value: null,
  },
];

const RegistrationForm = () => {
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    phoneNumber: null,
  });

  const onSubmithandler = (e: any) => {
    if (user.name !== "") {
      setUser({ name: "", lastName: "", phoneNumber: null });
      localStorage.setItem("cart", JSON.stringify(user));
    } else return alert("Name require");
  };
  const handelInputChange = (e: any) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const disable = user.lastName === "" || user.name === "" || !user.phoneNumber;

  return (
    <>
      <div
        style={{
          background: "linear-gradient(40deg, #252525 10% 40%, gray 60% 50%)",
          borderRadius: "10px",
          padding: "20px",
          border: "4px solid gray",
          textAlign: "left",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "30px",
            marginBottom: "20px",
            textDecoration: "underline",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          Enter User Detail
        </div>
        <form>
          {fields.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "20px",
                alignItems: "center",
              }}
            >
              <div style={{ width: "200px" }}>{item.label}</div>
              <input
                type={item.type}
                placeholder={item.placeholder}
                style={{ borderRadius: "4px", height: "30px", width: "400px" }}
                name={item.name}
                onChange={(e) => handelInputChange(e)}
                value={user[item.name] || ""}
              />
            </div>
          ))}
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={(e) => onSubmithandler(e)}
              disabled={disable}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div>dsadjkh</div>
    </>
  );
};

export default RegistrationForm;
