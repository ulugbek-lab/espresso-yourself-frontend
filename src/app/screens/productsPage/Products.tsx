import { ChangeEvent, useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { setProducts } from "./slice";
import { ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import { ProductCollection } from "../../../lib/enums/product.enums";
import ProductService from "../../services/ProductService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { CartItem } from "../../../lib/types/search";
import ProductCard from "../homePage/ProductCard";

interface Productsprops {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: Productsprops) {
  const { onAdd } = props;
  const dispatch = useAppDispatch();
  const products = useAppSelector(retrieveProducts);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.COFFEE,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    console.log("productSearch",productSearch);
    const product = new ProductService();
    product
      .getProducts(productSearch)

      .then((data) => dispatch(setProducts(data)))
      .catch((err) => console.log(err));
  }, [dispatch, productSearch]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch((currentSearch) => {
        if (currentSearch.search === "") return currentSearch;
        return { ...currentSearch, search: "" };
      });
    }
  }, [productSearch, searchText]);

  /** Handler */
  const searchCollectionHandler = (collection?: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const categories: { label: string; value?: ProductCollection }[] = [
    { label: "All drinks" },
    { label: "Coffee", value: ProductCollection.COFFEE },
    { label: "Decaf coffee", value: ProductCollection.DECAF_COFFEE },
    { label: "Cold brew", value: ProductCollection.COLD_BREW },
    { label: "Beverages", value: ProductCollection.BEVERAGE },
    { label: "Smoothies", value: ProductCollection.SMOOTHIE },
    { label: "Juice", value: ProductCollection.JUICE },
    { label: "Ade", value: ProductCollection.ADE },
    { label: "Tea", value: ProductCollection.TEA_TEA_BEVERAGE },
    { label: "Frappe", value: ProductCollection.FRAPPE },
    { label: "Milkshake", value: ProductCollection.MILKSHAKE },
  ];
  const activeCategory = categories.find(
    (category) => category.value === productSearch.productCollection,
  )?.label ?? "All drinks";

  return (
    <main className="products-menu">
      <Container className="products-menu-container">
        <header className="products-menu-intro">
          <span className="products-menu-eyebrow">Espresso Yourself menu</span>
          <h1>Find your next favorite drink.</h1>
          <p>Thoughtfully made coffee, bright refreshers, and sweet little pick-me-ups for every kind of day.</p>
        </header>

        <section className="products-menu-toolbar" aria-label="Menu search and sort">
          <div className="products-menu-search">
            <label className="visually-hidden" htmlFor="menu-search">Search the menu</label>
            <input id="menu-search" type="search" placeholder="Search coffee, tea, or something sweet" value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") searchProductHandler(); }} />
            <Button className="products-menu-search-button" type="button" onClick={searchProductHandler} aria-label="Search menu"><SearchIcon fontSize="small" /> <span>Search</span></Button>
          </div>
          <label className="products-menu-sort">
            <span>Sort by</span>
            <select value={productSearch.order} onChange={(e) => searchOrderHandler(e.target.value)}>
              <option value="createdAt">Newest</option>
              <option value="productPrice">Price</option>
              <option value="productViews">Most viewed</option>
            </select>
          </label>
        </section>

        <nav className="products-menu-categories" aria-label="Drink categories">
          {categories.map((category) => (
            <button key={category.label} type="button" className={`products-menu-category${productSearch.productCollection === category.value ? " is-active" : ""}`} onClick={() => searchCollectionHandler(category.value)}>{category.label}</button>
          ))}
        </nav>

        <section className="products-menu-results" aria-live="polite">
          <div>
            <span>{activeCategory}</span>
            <h2>{productSearch.search ? `Results for “${productSearch.search}”` : "Made for your moment"}</h2>
          </div>
          {productSearch.search && <button className="products-menu-clear" type="button" onClick={() => { setSearchText(""); productSearch.search = ""; productSearch.page = 1; setProductSearch({ ...productSearch }); }}>Clear search</button>}
        </section>

        {products.length !== 0 ? (
          <div className="products-menu-grid">
            {products.map((product) => <ProductCard key={product._id} product={product} onAdd={onAdd} showPromotion={false} />)}
          </div>
        ) : (
          <div className="products-menu-empty">
            <span>Nothing brewed up here yet.</span>
            <p>Try another search or explore a different drink category.</p>
            <button type="button" onClick={() => { setSearchText(""); setProductSearch({ page: 1, limit: 8, order: "createdAt", productCollection: ProductCollection.COFFEE, search: "" }); }}>Browse coffee</button>
          </div>
        )}

        <div className="products-menu-pagination">
          <Pagination count={products.length !== 0 ? productSearch.page + 1 : productSearch.page} page={productSearch.page} renderItem={(item) => <PaginationItem components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />} onChange={paginationHandler} />
        </div>
      </Container>
    </main>
  );
}
