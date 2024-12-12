import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    gap: "40px",
  },
  formContainer: {
    background: "linear-gradient(40deg, #252525 10% 40%, gray 60% 50%)",
    borderRadius: "10px",
    padding: "20px",
    border: "4px solid gray",
    textAlign: "left",
  },
  formHeader: {
    textAlign: "center",
    fontSize: "30px",
    marginBottom: "20px",
    textDecoration: "underline",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
  },
}));
