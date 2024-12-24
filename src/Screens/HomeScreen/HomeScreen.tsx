import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, OutlinedInput } from "@mui/material";
import { useStyles } from "./HomeScreen.styles";
import { Card } from "../Shared";
import Abc from "../../subRepo/Abc";

const HomeScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loader, setLoader] = useState<any>(true);
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();
  // const fetchNestedApiData = () => {
  //   axios
  //     .get("https://pokeapi.co/api/v2/pokemon?limit=200")
  //     .then(async (response) => {
  //       const allData = response.data;
  //       const nestedUrls = allData.results.map(async (data: any) => {
  //         return axios.get(data.url).then((response) => {
  //           return response.data;
  //         });
  //       });
  //       const finalData = await Promise.all(nestedUrls);

  //       setProducts(finalData);
  //       setLoader(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLoader(false);
  //     });
  // };
  const dummyJsonApi = () => {
    axios
      .get("https://dummyjson.com/products?&skip=10&limit=0")
      .then(async (response) => {
        const finalData = response.data.products;
        setProducts(finalData);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  useEffect(() => {
    setLoader(true);
    // fetchNestedApiData();
    dummyJsonApi();
  }, []);

  const searchData = products.filter((data) =>
    data.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      {loader ? (
        <div className={classes.container}>
          <CircularProgress color="warning" />
        </div>
      ) : (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Abc />
            <OutlinedInput
              style={{ border: "1px solid white", color: "white" }}
              color="secondary"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              placeholder="Search for cards"
            />
          </div>
          <div className={classes.mainContainer}>
            {searchData.length !== 0 ? (
              searchData.map((item: any, i) => (
                <Card
                  key={i}
                  title={item.title}
                  description={item.description}
                  imgUrl={item.thumbnail}
                />
              ))
            ) : (
              <h1>Item Not found</h1>
            )}

            {/* Pokemon Api data */}

            {/* {searchData.length !== 0 ? (
              searchData.map((item: any, i) => {
                return (
                  <Card
                    key={i}
                    title={item.name.toUpperCase()}
                    description={item.description}
                    imgUrl={item.sprites.other.dream_world.front_default}
                  />
                );
              })
            ) : (
              <h1>Item Not Found</h1>
            )} */}
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
