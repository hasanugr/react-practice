import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasket,
  removeBasket,
  totalMoneySelector,
} from "../redux/marketSlice";
import { priceBeauty } from "./priceBeauty";

function ContentItem({ item }) {
  const dispatch = useDispatch();
  const totalMoney = useSelector(totalMoneySelector);
  const [marketItem, setMarketItem] = useState({ ...item, quantity: 0 });

  const handleBasketAdd = () => {
    const newMarketItem = {
      ...marketItem,
      quantity: marketItem.quantity + 1,
    };
    setMarketItem(newMarketItem);
    dispatch(addBasket(newMarketItem));
  };

  const handleBasketRemove = () => {
    const newMarketItem = {
      ...marketItem,
      quantity: marketItem.quantity - 1,
    };
    setMarketItem(newMarketItem);
    dispatch(removeBasket(newMarketItem));
  };

  return (
    <div className="item">
      <img
        className="item_image"
        src={marketItem.picture}
        alt={marketItem.title}
      />
      <div className="title">{item.title}</div>
      <div className="price">${priceBeauty(marketItem.price)}</div>
      <div className="item-controls">
        <button
          className={marketItem.quantity > 0 ? "btnSell" : "btnDisable"}
          onClick={() => handleBasketRemove()}
          disabled={marketItem.quantity <= 0}
        >
          Sell
        </button>
        <input
          type="number"
          className="form-control"
          disabled
          value={marketItem.quantity}
          readOnly
          style={{ textAlign: "center" }}
        />
        <button
          className={
            totalMoney - marketItem.price >= 0 ? "btnAdd" : "btnDisable"
          }
          onClick={() => handleBasketAdd()}
          disabled={totalMoney - marketItem.price < 0}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default ContentItem;
