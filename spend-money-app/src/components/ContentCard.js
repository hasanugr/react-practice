import {
  basketItemsSelector,
  spendedMoneySelector,
} from "../redux/marketSlice";
import { priceBeauty, priceBeautySorter } from "./priceBeauty";
import { useSelector } from "react-redux";

function ContentCard() {
  const spendedMoney = useSelector(spendedMoneySelector);
  const basketItems = useSelector(basketItemsSelector);

  return (
    basketItems.length > 0 && (
      <div className="shopping_container">
        <div className="title">Your Receipt</div>
        <div className="cartList">
          {basketItems.map((item) => (
            <div className="card-item">
              <div className="card-item-name">{item.title}</div>
              <div className="card-item-quantity">{item.quantity}</div>
              <div className="card-item-price">
                ${priceBeautySorter(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
        <hr />
        <div className="card-item">
          <strong style={{ textAlign: "left" }}>TOTAL:</strong>{" "}
          <strong style={{ textAlign: "left", color: "rgb(46, 204, 113)" }}>
            ${priceBeauty(spendedMoney)}
          </strong>
        </div>
      </div>
    )
  );
}

export default ContentCard;
