const priceBeauty = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const priceBeautySorter = (price) => {
  price = price.toString().replace(/[^0-9.]/g, "");
  if (price < 1000) {
    return price;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (price >= si[index].v) {
      break;
    }
  }
  return (
    (price / si[index].v).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
};

export { priceBeauty, priceBeautySorter };
