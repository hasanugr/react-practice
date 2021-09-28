import config from "../config";
import { useSelector, useDispatch } from "react-redux";
import {
  changeClickableStatus,
  changeCompletedCardsCount,
  changeOpenedCard,
  decreaseScore,
  increaseScore,
  updateCard,
} from "../redux/cardSlice";

function Card({ item }) {
  const dispatch = useDispatch();

  const isClickable = useSelector((state) => state.cards.isClickable);
  const openedCard = useSelector((state) => state.cards.openedCard);
  const completedCardsCount = useSelector(
    (state) => state.cards.completedCardsCount
  );

  const clickHandle = () => {
    if (!isClickable) return false;

    console.log("1 ->", item.name);
    dispatch(updateCard({ id: item.id, changes: { isOpen: true } }));
    if (openedCard.length > 0) {
      dispatch(changeOpenedCard([...openedCard, { ...item, isOpen: true }]));
      dispatch(changeClickableStatus(false));
      setTimeout(() => {
        checkMatch();
      }, 1000);
    } else {
      dispatch(changeOpenedCard([{ ...item, isOpen: true }]));
    }
    console.log("2 ->", item.name);
  };

  const checkMatch = () => {
    console.log("UPDATED.!!");
    console.log(openedCard);
    const checkResult =
      openedCard[0].name === item.name && openedCard[0].id !== item.id;

    dispatch(
      updateCard({
        id: openedCard[0].id,
        changes: {
          isOpen: checkResult,
          isMatched: checkResult,
        },
      })
    );
    dispatch(
      updateCard({
        id: item.id,
        changes: {
          isOpen: checkResult,
          isMatched: checkResult,
        },
      })
    );

    checkResult ? dispatch(increaseScore()) : dispatch(decreaseScore());
    dispatch(changeCompletedCardsCount(completedCardsCount + 2));

    dispatch(changeOpenedCard([]));
    setTimeout(() => {
      dispatch(changeClickableStatus(true));
    }, 500);
  };

  return (
    <div
      className={`card ${item.isOpen && "opened"} ${
        item.isMatched && "matched"
      }`}
    >
      <div
        className={`front ${!isClickable && "disable"}`}
        onClick={clickHandle}
      >
        ?
      </div>
      <div className="back">
        <img src={`${config.apiEndPoint}${item.name}.png`} />
      </div>
    </div>
  );
}

export default Card;
