import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    width: "300px",
    background: "linear-gradient(40deg, #252525 10% 40%, gray 60% 50%)",
    borderRadius: "10px",
    padding: "20px",
    "&:hover": {
      boxShadow:
        "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
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
