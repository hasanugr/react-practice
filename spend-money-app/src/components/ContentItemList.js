import React from "react";
import config from "../config";
import ContentItem from "./ContentItem";

function ContentItemList() {
  const marketItems = config.marketItems;

  return (
    <div className="items">
      {marketItems.map((item) => (
        <ContentItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ContentItemList;
