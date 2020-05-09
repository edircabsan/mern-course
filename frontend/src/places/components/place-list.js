import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/ui-elements/card";
import PlaceItem from "./place-item";
import Button from "../../shared/components/form-elements/button";

import "./place-list.css";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <div className="place-list">
            <h2>No places found. Maybe create one?</h2>
            <Button to="/places/new">Share Place</Button>
          </div>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
