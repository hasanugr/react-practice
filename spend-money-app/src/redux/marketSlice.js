import { createSlice } from "@reduxjs/toolkit";
import config from "../config";

export const marketSlice = createSlice({
  name: "market",
  initialState: {
    totalMoney: config.totalMoney,
    spendedMoney: 0,
    basketItems: [],
  },
  reducers: {
    addBasket: (state, action) => {
      let basketItem = action.payload;
      let itemIndex = state.basketItems.findIndex(
        (item) => item.id === basketItem.id
      );
      if (itemIndex >= 0) {
        state.basketItems[itemIndex].quantity += 1;
      } else {
        state.basketItems = [...state.basketItems, basketItem];
      }
      state.spendedMoney += basketItem.price;
      state.totalMoney -= basketItem.price;
    },
    removeBasket: (state, action) => {
      let item_id = action.payload.id;
      let itemIndex = state.basketItems.findIndex(
        (item) => item.id === item_id
      );
      let itemPrice = state.basketItems[itemIndex].price;

      if (state.basketItems[itemIndex].quantity > 1) {
        state.basketItems[itemIndex].quantity -= 1;
      } else {
        state.basketItems.splice(itemIndex, 1);
      }
      state.spendedMoney -= itemPrice;
      state.totalMoney += itemPrice;
    },
  },
});

export const totalMoneySelector = (state) => state.market.totalMoney;
export const spendedMoneySelector = (state) => state.market.spendedMoney;
export const basketItemsSelector = (state) => state.market.basketItems;

export const { addBasket, removeBasket } = marketSlice.actions;

export default marketSlice.reducer;
