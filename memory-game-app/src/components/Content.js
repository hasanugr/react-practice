import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCards,
  cardSelectors,
  deleteCards,
  changeCompletedCardsCount,
} from "../redux/cardSlice";
import Card from "./Card";

function Content() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.allCards);
  const score = useSelector((state) => state.cards.score);
  const completedCardsCount = useSelector(
    (state) => state.cards.completedCardsCount
  );
  const activeCards = useSelector(cardSelectors.selectAll);
  const totalCards = useSelector(cardSelectors.selectTotal);

  useEffect(() => {
    if (totalCards > 0) return false;

    ShuffleAndStartGame(0, false);
  }, [dispatch]);

  const ShuffleAndStartGame = (delay, isReset) => {
    const shuffledCards = cards
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    const cardMapping = shuffledCards.map((name) => ({
      id: nanoid(),
      name: name,
      isOpen: false,
      isMatched: false,
    }));

    setTimeout(() => {
      if (isReset) {
        dispatch(deleteCards());
        dispatch(changeCompletedCardsCount(0));
      }
      dispatch(addCards(cardMapping));
    }, delay);
  };

  return (
    <>
      <div className="playground">
        {activeCards.map((card) => (
          <Card key={card.id} item={card} />
        ))}
      </div>
      <div className="score-field">
        Score: <span className="score-point">{score}</span>
      </div>
      {completedCardsCount === totalCards && completedCardsCount > 10 && (
        <>
          <div className="modal-bg" />
          <div
            className="modal-button"
            onClick={() => ShuffleAndStartGame(1000, true)}
          >
            <span>Play Again</span>
          </div>
        </>
      )}
    </>
  );
}

export default Content;
