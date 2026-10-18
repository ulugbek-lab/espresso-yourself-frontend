import { useEffect } from "react";
import SeasonalPicks from "./SeasonalPicks";
import TodaysDiscounts from "./TodaysDiscounts";
import CoffeeVideo from "./CoffeeVideo";
import TropicalHero from "./TropicalHero";
import MostViewed from "./MostViewed";
import Statistics from "./Statistics";

import { setMostViewedProducts, setTodaysDiscountProducts } from "./slice";
import ProductService from "../../services/ProductService";

import "../../../css/home.css";
import { CartItem } from "../../../lib/types/search";
import { useAppDispatch } from "../../hooks";

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export default function HomePage({ onAdd }: HomePageProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
      })
      .then((data) => dispatch(setMostViewedProducts(data)))
      .catch((err) => console.log(err));
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => dispatch(setTodaysDiscountProducts(data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <div className="homepage">
      <TropicalHero />
      <Statistics />
      <TodaysDiscounts onAdd={onAdd} />
      <CoffeeVideo />
      <MostViewed onAdd={onAdd} />
      <SeasonalPicks onAdd={onAdd} />
    </div>
  );
}
