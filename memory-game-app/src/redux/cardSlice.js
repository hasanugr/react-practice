import { createSlice, createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import config from "../config";

const cardAdapter = createEntityAdapter();
const initialState = cardAdapter.getInitialState({
  score: 0,
  completedCardsCount: 0,
  openedCard: [],
  allCards: [...config.cards, ...config.cards],
  isClickable: true,
  status: "idle",
});

export const cardSelectors = cardAdapter.getSelectors((state) => state.cards);

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCards: cardAdapter.addMany,
    updateCard: cardAdapter.updateOne,
    updateCards: cardAdapter.updateMany,
    deleteCards: cardAdapter.removeAll,
    changeClickableStatus: (state, actions) => {
      state.isClickable = actions.payload;
    },
    changeOpenedCard: (state, actions) => {
      state.openedCard = actions.payload;
    },
    increaseScore: (state) => {
      state.score += config.scoreIncreaseValue;
    },
    decreaseScore: (state) => {
      state.score -= config.scoreDecreaseValue;
    },
    changeCompletedCardsCount: (state, actions) => {
      state.completedCardsCount = actions.payload;
    },
  },
});

export const {
  addCards,
  updateCard,
  updateCards,
  deleteCards,
  changeClickableStatus,
  changeOpenedCard,
  increaseScore,
  decreaseScore,
  changeCompletedCardsCount,
} = cardSlice.actions;

export default cardSlice.reducer;
