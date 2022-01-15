import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MovieThumb.css";

const MovieThumb = (props) => {
  return (
    <div className="moviethumb">
      {props.clickable ? (
        <Link
          to={{
            pathname: `/movie/${props.movieId}`,
            movieName: `${props.movieName}`,
            vote_average: `{props.vote_average}`,
            release_date: `{props.release_date}`,
          }}
        >
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={props.image} alt="moviethumb" />
              </div>
              <div className="flip-card-back">
                <h2>{props.movieName}</h2>
                <h2>Rating: {props.vote_average}</h2>
                <p>Click for more Info</p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <img src={props.image} alt="moviethumb" />
      )}
    </div>
  );
};

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
};

export default MovieThumb;
