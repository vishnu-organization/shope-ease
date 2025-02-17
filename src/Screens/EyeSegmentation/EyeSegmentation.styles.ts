import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    display: "flex",
    padding: "50px",
    gap: 40,
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));
