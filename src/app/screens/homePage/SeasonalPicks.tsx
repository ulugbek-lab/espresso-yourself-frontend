import { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useHistory } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enums";
import ProductCard from "./ProductCard";
import { CartItem } from "../../../lib/types/search";

interface SeasonalPicksProps {
  onAdd: (item: CartItem) => void;
}

export default function SeasonalPicks({ onAdd }: SeasonalPicksProps) {
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productService = new ProductService();
    Promise.all([
      productService.getProducts({ page: 1, limit: 2, order: "createdAt", productCollection: ProductCollection.ADE }),
      productService.getProducts({ page: 1, limit: 2, order: "createdAt", productCollection: ProductCollection.JUICE }),
    ])
      .then(([adeProducts, juiceProducts]) => setProducts([...adeProducts, ...juiceProducts]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="seasonal-picks-frame">
      <Container>
        <Stack className="section-heading section-heading-row">
          <Stack>
            <span className="section-eyebrow">Seasonal picks</span>
            <Box className="section-title">Fresh flavors for today</Box>
            <Box className="section-support">Explore bright fruit and citrus-forward drinks from the menu.</Box>
          </Stack>
          <Box className="view-menu-link" onClick={() => history.push("/products")}>Explore menu <ArrowRight size={16} /></Box>
        </Stack>
        {products.length !== 0 ? (
          <div className="home-product-grid">
            {products.map((product) => <ProductCard key={product._id} product={product} onAdd={onAdd} showPromotion={false} />)}
          </div>
        ) : <Box className="trending-empty">Seasonal picks will appear here shortly.</Box>}
      </Container>
    </section>
  );
}
