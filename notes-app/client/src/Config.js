const COLOR_CODES = [
  {
    id: "1",
    code: "#F06291",
  },
  {
    id: "2",
    code: "#BA68C8",
  },
  {
    id: "3",
    code: "#FFD54E",
  },
  {
    id: "4",
    code: "#50C2F7",
  },
  {
    id: "5",
    code: "#AED580",
  },
];

const GetColorById = (colorId) => {
  const result = COLOR_CODES.find((item) => item.id === colorId);
  return result.code;
};

export { COLOR_CODES, GetColorById };
