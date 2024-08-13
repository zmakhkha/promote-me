
const baseUrl = import.meta.env.VITE_API_URL;
const getImage = (url: string) => {
  return baseUrl + url;
};

export default getImage;
