import React from "react";

const baseUrl = "https://10.13.1.10:2000";
const getImage = (url: string) => {
  return baseUrl + url;
};

export default getImage;
