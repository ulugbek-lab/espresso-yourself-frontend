import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

//6.STEP
const selectHomePage = (state: AppRootState) => state.homePage;

export const selectMostViewedProducts = createSelector(
  selectHomePage,
  (homePage) => homePage.mostViewedProducts,
);
export const selectTodaysDiscountProducts = createSelector(
  selectHomePage,
  (homePage) => homePage.todaysDiscountProducts,
);
