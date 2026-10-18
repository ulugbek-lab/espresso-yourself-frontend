import { Box, Container, Stack } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useHistory } from "react-router-dom";
import { selectTodaysDiscountProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductCard from "./ProductCard";
import { CartItem } from "../../../lib/types/search";
import { useAppSelector } from "../../hooks";

interface TodaysDiscountsProps {
  onAdd: (item: CartItem) => void;
}

export default function TodaysDiscounts({ onAdd }: TodaysDiscountsProps) {
  const products = useAppSelector(selectTodaysDiscountProducts);
  const history = useHistory();

  return (
    <section className="todays-discounts-frame">
      <Container>
        <Stack className="section-heading section-heading-row">
          <Stack>
            <span className="section-eyebrow">Freshly selected</span>
            <Box className="section-title">Today&apos;s Discounts</Box>
            <Box className="section-support">Handpicked offers, just for today.</Box>
          </Stack>
          <Box className="view-menu-link" onClick={() => history.push("/products")}>View full menu <ArrowRight size={16} /></Box>
        </Stack>
        {products.length !== 0 ? <div className="home-product-grid">{products.slice(0, 4).map((product: Product, index) => <ProductCard key={product._id} product={product} onAdd={onAdd} promotionIndex={index} />)}</div> : <Box className="trending-empty">Today&apos;s picks will appear here shortly.</Box>}
      </Container>
    </section>
  );
}
