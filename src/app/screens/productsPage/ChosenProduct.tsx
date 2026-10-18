import React, { useEffect, useState } from "react";
import { Container, Button, Dialog, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useParams } from "react-router-dom"; // @ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";

import { setChosenProduct, setRestaurant } from "./slice";
import { Product } from "../../../lib/types/product";
import { retrieveChosenProduct } from "./selector";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { CartItem } from "../../../lib/types/search";
import { X, ZoomIn } from "lucide-react";
import ProductCard from "../homePage/ProductCard";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ChosenProductsprops {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsprops) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const chosenProduct = useAppSelector(retrieveChosenProduct);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const chosenProductId = chosenProduct?._id;
  const chosenProductCollection = chosenProduct?.productCollection;

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => dispatch(setChosenProduct(data)))
      .catch((err) => console.log(err));
  }, [dispatch, productId]);

  useEffect(() => {
    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => dispatch(setRestaurant(data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    if (!chosenProductId || !chosenProductCollection) return;

    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 5,
        order: "createdAt",
        productCollection: chosenProductCollection,
      })
      .then((data) =>
        setRelatedProducts(
          data.filter((item) => item._id !== chosenProductId).slice(0, 4),
        ),
      )
      .catch((err) => console.log(err));
  }, [chosenProductCollection, chosenProductId]);

  if (!chosenProduct) return null;

  const collectionName = chosenProduct.productCollection
    .replace("TEA_TEA_BEVERAGE", "Tea & Beverage")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <main className="chosen-product">
      <Container className="product-detail-container">
        <div className="product-detail-main">
          <section
            className="chosen-product-slider"
            aria-label={`${chosenProduct.productName} gallery`}
          >
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiper-area"
            >
              {chosenProduct?.productImages.map(
                (ele: string, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <button
                        type="button"
                        className="product-image-button"
                        onClick={() => setZoomImage(ele)}
                        aria-label={`View larger image ${index + 1} of ${chosenProduct.productName}`}
                      >
                        <img
                          className="slider-image"
                          src={ele}
                          alt={chosenProduct.productName}
                        />
                        <span className="product-image-zoom">
                          <ZoomIn size={17} /> View image
                        </span>
                      </button>
                    </SwiperSlide>
                  );
                },
              )}
            </Swiper>
          </section>
          <section className="chosen-product-info">
            <span className="product-detail-category">{collectionName}</span>
            <h1 className="product-name">{chosenProduct.productName}</h1>
            {chosenProduct.productDesc && (
              <p className="product-desc">{chosenProduct.productDesc}</p>
            )}
            <div className="product-detail-price">
              <span>Price</span>
              <strong>${chosenProduct.productPrice.toLocaleString()}</strong>
            </div>
            <div className="product-detail-meta">
              {chosenProduct.productSize && (
                <div>
                  <span>Size</span>
                  <strong>{chosenProduct.productSize}</strong>
                </div>
              )}
              {chosenProduct.productVolume && (
                <div>
                  <span>Volume</span>
                  <strong>{chosenProduct.productVolume}</strong>
                </div>
              )}
              <div>
                <span>Views</span>
                <strong>
                  <RemoveRedEyeIcon fontSize="small" />{" "}
                  {chosenProduct.productViews}
                </strong>
              </div>
            </div>
            <div className="button-box">
              <Button
                variant="contained"
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation(); // prevents cart from going to another page
                }}
              >
                Add to basket
              </Button>
            </div>
          </section>
        </div>
        {relatedProducts.length !== 0 && (
          <section className="product-detail-related">
            <div className="product-detail-related-heading">
              <div>
                <span>YOU MAY ALSO LIKE</span>
                <h2>More from {collectionName.toLowerCase()}</h2>
              </div>
            </div>
            <div className="home-product-grid">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAdd={onAdd}
                  showPromotion={false}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
      <Dialog
        open={Boolean(zoomImage)}
        onClose={() => setZoomImage(null)}
        className="product-zoom-dialog"
        maxWidth="md"
      >
        <IconButton
          className="product-zoom-close"
          aria-label="Close product image preview"
          onClick={() => setZoomImage(null)}
        >
          <X size={20} />
        </IconButton>
        {zoomImage && (
          <img src={zoomImage} alt={`${chosenProduct.productName} enlarged`} />
        )}
      </Dialog>
    </main>
  );
}
