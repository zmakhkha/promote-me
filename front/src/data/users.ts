import p1 from "/Users/zmakhkha/Desktop/1.jpeg";
import p2 from "/Users/zmakhkha/Desktop/2.jpeg";
import p3 from "/Users/zmakhkha/Desktop/3.jpeg";
export default [
  {
    id: 1,
    name: "Rose",
    gender: "Male",
    location: "Piscataway, NJ",
    background_image: p1,
    parent_platforms: [
      {
        platform: {
          id: 1,
          name: "Snapchat",
          slug: "snapchat",
          username: "shaneansel",
        },
      },
    ],
    age: 19,
    rating_top: 18,
  },
  {
    id: 2,
    name: "Mathea",
    gender: "Female",
    location: "Nairobi, Nairobi County Provin",
    background_image: p2,
    parent_platforms: [
      {
        platform: {
          id: 1,
          name: "Tiktok",
          slug: "tiktok",
          username: "shaneansel",
        },
      },
    ],
    age: 19,
    rating_top: 18,
  },
  {
    id: 3,
    name: "Anna",
    gender: "Male",
    location: "Exeter, England, UK",
    background_image: p3,
    parent_platforms: [
      {
        platform: {
          id: 1,
          name: "instagram",
          slug: "instagram",
          username: "shaneansel",
        },
      },
    ],
    age: 32,
    rating_top: 18,
  },
  {
    id: 4,
    name: "Anna",
    gender: "Male",
    location: "Exeter, England, UK",
    background_image: p3,
    parent_platforms: [
      {
        platform: {
          id: 1,
          name: "instagram",
          slug: "instagram",
          username: "shaneansel",
        },
      },
    ],
    age: 32,
    rating_top: 18,
  },
];
