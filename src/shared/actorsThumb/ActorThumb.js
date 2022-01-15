import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./ActorThumb.css";

const ActorThumb = (props) => {
  return (
    <div className="personthumb">
      {props.clickable ? (
        <Link
          to={{
            pathname: `/actor/${props.personId}`,
            personName: `${props.personName}`,
            popularity: `${props.popularity}`,
          }}
        >
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={props.image} alt="personthumb" />
              </div>
              <div className="flip-card-back">
                <h2>{props.personName}</h2>
                <h3>Popularity Score</h3>
                <h3>{props.popularity}</h3>
                <p>Click for more Info</p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <img src={props.image} alt="personthumb" />
      )}
    </div>
  );
};

ActorThumb.propTypes = {
  image: PropTypes.string,
  personId: PropTypes.number,
  personName: PropTypes.string,
};

export default ActorThumb;
