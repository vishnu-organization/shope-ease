import { useStyles } from "./Card.styles";

type Props = {
  title: string;
  description?: string;
  imgUrl: string;
};
const Card = ({ title, description, imgUrl }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div style={{ height: "100px" }}>
        <img
          src={imgUrl || "https://picsum.photos/200/300/?blur"}
          style={{
            objectFit: "contain",
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      <p
        style={{
          fontWeight: "bold",
          textDecoration: "underline",
          color: "white",
        }}
      >
        {title}
      </p>
      <p style={{ color: "white" }}>{description}</p>
    </div>
  );
};

export default Card;
