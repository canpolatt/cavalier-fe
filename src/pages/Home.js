import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { getAllProducts } from "../api/productApi";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Container maxWidth="lg" className="mt-8  ">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <img
              className="mx-auto md:w-1/2"
              style={{ border: ".5px solid gainsboro" }}
              src="https://st1.myideasoft.com/shop/bo/48/myassets/products/681/rattan-masa-seti-ant.jpg?revision=1639823801"
              alt="product"
            />
          </Grid>
          <Grid
            flexDirection={"row"}
            item
            xs={12}
            md={12}
            style={{ textAlign: "center" }}
          >
            <p style={{ textAlign: "center" }}>About Us</p>
          </Grid>
          <Grid flexDirection={"row"} className="md:mx-40" item xs={12} md={12}>
            <p>
              Cavalier is a Cape Town based interior design studio. We are
              creators of progressive, elegant furniture and lighting, as well
              as artisanal objects and contemporary floor art. Our design is
              inspired by an enquiring contemporary aesthetic and timeless
              classicism, with a deep respect for natural materials and
              traditional craftsmanship. We aim to be at the forefront of
              discerning modern living, and offer a fully comprehensive and
              bespoke interior design service.
            </p>
            <br />
            <p>
              Our desire is to continuously explore and refine our aesthetic to
              better communicate intimate and characterful narratives through
              the art of design.
            </p>
          </Grid>
          <Grid
            flexDirection={"row"}
            className="text-center"
            item
            xs={12}
            md={12}
          >
            <p>Products</p>
          </Grid>
          {products.map((item, idx) => (
            <Grid item xs={12} md={4} className="mb-4 text-center" key={idx}>
              <img
                className="w-full h-full object-cover hover:brightness-75 hover:cursor-pointer"
                src={item.image}
                alt={item.title}
              />
              <p>{item.title}</p>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
