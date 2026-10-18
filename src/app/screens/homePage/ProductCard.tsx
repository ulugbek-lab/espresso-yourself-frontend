import React from "react";
import { Box } from "@mui/material";
import { Eye } from "lucide-react";
import { Plus } from "lucide-react";
import { useHistory } from "react-router-dom";
import { Product } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";

interface ProductCardProps {
  product: Product;
  onAdd?: (item: CartItem) => void;
  promotionIndex?: number;
  showPromotion?: boolean;
}

const formatCollection = (collection: string) =>
  collection
    .replace("TEA_TEA_BEVERAGE", "Tea & beverage")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const promotionRates = [15, 10, 15, 20];

const getPresentationTags = (collection: string) => {
  if (collection === "ADE" || collection === "JUICE") return ["Fruity", "Fresh"];
  if (collection === "COFFEE" || collection === "DECAF_COFFEE" || collection === "COLD_BREW") return ["Bold", "Creamy"];
  return ["Smooth"];
};

const formatPromotionPrice = (price: number) => `₩${Math.round(price).toLocaleString("ko-KR")}`;

export default function ProductCard({ product, onAdd, promotionIndex = 0, showPromotion = true }: ProductCardProps) {
  const history = useHistory();
  const imagePath = product.productImages[0];
  const discountRate = promotionRates[promotionIndex % promotionRates.length];
  const promotionalOriginalPrice = Math.round((product.productPrice / (1 - discountRate / 100)) / 10) * 10;
  const tags = getPresentationTags(product.productCollection);

  return (
    <Box
      className="home-product-card"
      role="link"
      tabIndex={0}
      onClick={() => history.push(`/products/${product._id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          history.push(`/products/${product._id}`);
        }
      }}
    >
      <div className="home-product-image-wrap">
        <img src={imagePath} alt={product.productName} className="home-product-image" />
        {showPromotion && <span className="home-product-discount">{discountRate}% off</span>}
        <span className="home-product-category">{formatCollection(product.productCollection)}</span>
      </div>
      <Box className="home-product-details">
        <span className="home-product-name">{product.productName}</span>
        {showPromotion && <div className="home-product-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
        <div className="home-product-meta">
          <div className="home-product-price-group"><span className="home-product-price">{showPromotion ? formatPromotionPrice(product.productPrice) : `$${product.productPrice}`}</span>{showPromotion && <span className="home-product-original-price">{formatPromotionPrice(promotionalOriginalPrice)}</span>}</div>
          <div className="home-product-actions">
            <span className="home-product-views"><Eye size={14} /> {product.productViews}</span>
            {onAdd && <button className="home-product-quick-add" type="button" aria-label={`Add ${product.productName} to basket`} onClick={(event) => { event.stopPropagation(); onAdd({ _id: product._id, quantity: 1, name: product.productName, price: product.productPrice, image: product.productImages[0] }); }} onKeyDown={(event) => event.stopPropagation()}><Plus size={18} /></button>}
          </div>
        </div>
      </Box>
    </Box>
  );
}
