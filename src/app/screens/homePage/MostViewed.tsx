import { Box, Container, Stack } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useHistory } from "react-router-dom";
import { selectMostViewedProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductCard from "./ProductCard";
import { CartItem } from "../../../lib/types/search";
import { useAppSelector } from "../../hooks";

interface MostViewedProps {
  onAdd: (item: CartItem) => void;
}

export default function MostViewed({ onAdd }: MostViewedProps) {
  const products = useAppSelector(selectMostViewedProducts);
  const history = useHistory();

  return (
    <section className="most-viewed-frame">
      <Container>
        <Stack className="section-heading section-heading-row">
          <Stack>
            <span className="section-eyebrow">Customer favorites</span>
            <Box className="section-title">Most viewed</Box>
            <Box className="section-support">
              The drinks people are checking out most.
            </Box>
          </Stack>
          <Box
            className="view-menu-link"
            onClick={() => history.push("/products")}
          >
            View full menu <ArrowRight size={16} />
          </Box>
        </Stack>
        {products.length !== 0 ? (
          <div className="home-product-grid">
            {products.slice(0, 4).map((product: Product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAdd={onAdd}
                showPromotion={true}
              />
            ))}
          </div>
        ) : (
          <Box className="trending-empty">
            Customer favorites will appear here shortly.
          </Box>
        )}
      </Container>
    </section>
  );
}
