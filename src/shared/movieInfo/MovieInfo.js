import React from "react";
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from "../../utils/config";
import FontAwesome from "react-fontawesome";
import MovieThumb from "../movieThumb/MovieThumb";
import "./MovieInfo.css";
import Rating from "../../shared/rating/Rating";
const MovieInfo = (props) => {
  return (
    <div
      className="movieinfo"
      style={{
        background: props.movie.backdrop_path
          ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.movie.backdrop_path}')`
          : "#000",
      }}
    >
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
          <MovieThumb
            image={
              props.movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.movie.poster_path}`
                : "./images/no_image.jpg"
            }
            clickable={false}
          />
        </div>
        <div className="movieinfo-text">
          <h1>{props.movie.title}</h1>
          <h3>Plot</h3>
          <p>{props.movie.overview}</p>
          <h3>IMDB Rating</h3>
          <p>{props.movie.rating}</p>
          <div className="rating">
            <meter
              min="0"
              max="100"
              optimum="100"
              low="40"
              high="70"
              value={props.movie.vote_average * 10}
            ></meter>
            <p className="score">{props.movie.vote_average}</p>
          </div>
          {props.directors.length > 1 ? <h3>Directors</h3> : <h3>Director</h3>}
          {props.directors.map((element, i) => {
            return (
              <p key={i} className="director">
                {element.name}
              </p>
            );
          })}
          <Rating movieId={props.movieId} />
        </div>
        <FontAwesome className="fa-film" name="film" size="5x" />
      </div>
    </div>
  );
};

export default MovieInfo;
