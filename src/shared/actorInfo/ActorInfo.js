import React from "react";
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from "../../utils/config";
import FontAwesome from "react-fontawesome";
import ActorThumb from "../actorsThumb/ActorThumb";
import "./ActorInfo.css";

const ActorInfo = (props) => {
  return (
    <div
      className="movieinfo"
      style={{
        background: props.person.backdrop_path
          ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${props.person.known_for.backdrop_path}')`
          : "#FFFFFF",
      }}
    >
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
          <ActorThumb
            image={
              props.person.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.person.profile_path}`
                : "./images/no_image.jpg"
            }
            clickable={false}
          />
        </div>
        <div className="movieinfo-text">
          <h1>{props.person.title}</h1>
          <h3>Biography</h3>
          <p>{props.person.biography}</p>
          <h3>Popularity</h3>
          <p>{props.person.popularity}</p>
        </div>
        <FontAwesome className="fa-film" name="film" size="5x" />
      </div>
    </div>
  );
};

export default ActorInfo;
