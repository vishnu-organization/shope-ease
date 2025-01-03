import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    width: "300px",
    background: "linear-gradient(40deg, #252525 10% 40%, gray 60% 50%)",
    borderRadius: "10px",
    padding: "20px",
    "&:hover": {
      boxShadow: "rgba(9, 9, 240, 0.25) 10px 10px 20px 20px",
    },
  },
  mainContainer: {
    display: "flex",
    padding: "50px",
    gap: 40,
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));
