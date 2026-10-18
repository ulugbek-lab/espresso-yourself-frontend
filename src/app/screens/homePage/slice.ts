import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  mostViewedProducts: [],
  todaysDiscountProducts: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setMostViewedProducts: (state, action) => {
      state.mostViewedProducts = action.payload;
    },
    setTodaysDiscountProducts: (state, action) => {
      state.todaysDiscountProducts = action.payload;
    },
  },
});
// Exported to use them in components separetely
export const { setMostViewedProducts, setTodaysDiscountProducts } =
  homePageSlice.actions;

  // 5 STEP 
// Exported to connect it to redux store
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
