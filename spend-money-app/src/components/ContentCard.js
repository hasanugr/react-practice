import {
  basketItemsSelector,
  spendedMoneySelector,
} from "../redux/marketSlice";
import priceBeauty from "./priceBeauty";
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
            <div style={{ marginBottom: "15px" }}>
              {item.title} x{item.quantity}{" "}
              <strong style={{ color: "rgb(46, 204, 113)" }}>
                ${priceBeauty(item.price * item.quantity)}
              </strong>
            </div>
          ))}
        </div>
        <hr />
        <div className="cartList">
          <strong>TOTAL:</strong>{" "}
          <strong style={{ color: "rgb(46, 204, 113)" }}>
            ${priceBeauty(spendedMoney)}
          </strong>
        </div>
      </div>
    )
  );
}

export default ContentCard;
