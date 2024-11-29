import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { TableGrid } from "../Shared";
import { useStyles } from "./RegistrationForm.styles";

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
  const [user, setUser] = useState<any>({
    name: "",
    lastName: "",
    phoneNumber: null,
  });
  const [nuser, setNuser] = useState<any[]>([]);
  const classes = useStyles();
  useEffect(() => {
    const storedUsers = localStorage.getItem("cart");
    if (storedUsers) {
      setNuser(JSON.parse(storedUsers));
    }
  }, []);

  const onSubmithandler = (e: any) => {
    e.preventDefault();
    if (user.name !== "") {
      const updatedUsers = [...nuser, user];
      localStorage.setItem("cart", JSON.stringify(updatedUsers));
      setNuser(updatedUsers);
      setUser({ name: "", lastName: "", phoneNumber: null });
    } else {
      alert("Name is required");
    }
  };

  const handelInputChange = (e: any) => {
    const { value, name } = e.target;
    setUser((prev: any) => ({ ...prev, [name]: value }));
  };

  const disable = user.lastName === "" || user.name === "" || !user.phoneNumber;

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.formHeader}>Enter User Detail</div>
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
      <TableGrid data={nuser} />
    </div>
  );
};

export default RegistrationForm;
