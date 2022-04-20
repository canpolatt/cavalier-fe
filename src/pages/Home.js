import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { getAllProducts } from "../api/productApi";
import { Autoplay } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import SliderImage1 from "../assets/009A3717.jpg";
import SliderImage2 from "../assets/009A3541.JPG";
import SliderImage3 from "../assets/009A3144.jpg";
import Categories from "../components/Categories";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoading } from "../redux/loading/loadingSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading("pending"));
    getAllProducts()
      .then((res) => setProducts(res))
      .finally(() => dispatch(setIsLoading("fulfilled")))
      .catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <>
      {isLoading === "initial" || isLoading === "pending" ? (
        <Loading />
      ) : (
        <Container maxWidth="lg" className="py-8">
          <Swiper id="swiper" modules={[Autoplay]} autoplay={{ delay: 2500 }}>
            <SwiperSlide>
              <img loading="lazy" src={SliderImage1} alt={SliderImage1} />
            </SwiperSlide>
            <SwiperSlide>
              <img loading="lazy" src={SliderImage2} alt={SliderImage2} />
            </SwiperSlide>
            <SwiperSlide>
              <img loading="lazy" src={SliderImage3} alt={SliderImage3} />
            </SwiperSlide>
          </Swiper>
          <h2 className="text-xl mt-4 md:text-2xl lg:text-4xl text-center">Kategoriler</h2>
          <Categories slidesPerView={3}/>
          <Grid item xs={12} md={12}>
            <img
              loading="lazy"
              className="mx-auto assets-loading"
              style={{ border: ".5px solid gainsboro" }}
              src="https://st1.myideasoft.com/shop/bo/48/myassets/products/681/rattan-masa-seti-ant.jpg?revision=1639823801"
              alt="product"
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid
              flexDirection={"row"}
              item
              xs={12}
              md={12}
              style={{ textAlign: "center" }}
            >
              <h2 className="text-xl mt-4 md:text-2xl lg:text-4xl text-center">About Us</h2>
            </Grid>

            <Grid
              flexDirection={"row"}
              className="md:mx-40"
              item
              xs={12}
              md={12}
            >
              <p className="mt-4">
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
                Our desire is to continuously explore and refine our aesthetic
                to better communicate intimate and characterful narratives
                through the art of design.
              </p>
            </Grid>
            <Grid
              flexDirection={"row"}
              className="text-center"
              item
              xs={12}
              md={12}
            >
              <h2 className="text-xl mt-4 md:text-2xl lg:text-4xl text-center">Products</h2>
            </Grid>
            {products?.map((item, idx) => (
              <Grid item xs={12} md={4} className="mb-4 text-center" key={idx}>
                <img
                  loading="lazy"
                  className="w-full h-full object-cover hover:brightness-75 hover:cursor-pointer"
                  src={item.image}
                  alt={item.title}
                />
                <p>{item.title}</p>
              </Grid>
            ))}
          </Grid>
          <MessageBox/>
        </Container>
      )}
    </>
  );
};

export default Home;
