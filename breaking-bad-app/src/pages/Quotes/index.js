import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllQuotes,
  quotesErrorSelector,
  quotesItemsSelector,
  quotesStatusSelector,
} from "../../redux/quotesSlice";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Item from "./Item";
import "./styles.css";

function Quotes() {
  const dispatch = useDispatch();
  const data = useSelector(quotesItemsSelector);
  const status = useSelector(quotesStatusSelector);
  const error = useSelector(quotesErrorSelector);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllQuotes());
    }
  }, [dispatch, status]);

  return (
    <div style={{ padding: "10px" }}>
      <h1>Quotes</h1>
      {status === "loading" && <Loading />}
      {status === "failed" && <Error message={error} />}
      {status === "succeeded" &&
        data.map((item) => <Item key={item.quote_id} item={item} />)}
      {status === "succeeded" && (
        <div className="quotes_info">{data.length} quotes</div>
      )}
    </div>
  );
}

export default Quotes;
