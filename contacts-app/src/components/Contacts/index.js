import { useSelector } from "react-redux";
import { contactSelectors } from "../../redux/contactSlice";

import Form from "./Form";
import List from "./List";

function Contacts() {
  const total = useSelector(contactSelectors.selectTotal);

  return (
    <>
      <h1>Contacts ({total})</h1>
      <List />
      <Form />
    </>
  );
}

export default Contacts;
