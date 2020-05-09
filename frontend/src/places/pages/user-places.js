import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/place-list";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Big Ben",
    description: "The most famous clock int the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Big_Ben%2C_Londres%2C_Inglaterra%2C_2014-08-11%2C_DD_205.JPG/260px-Big_Ben%2C_Londres%2C_Inglaterra%2C_2014-08-11%2C_DD_205.JPG",
    address: "Westminster, London SW1A 0AA",
    location: {
      lat: 51.5007292,
      lng: -0.1268141,
    },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
