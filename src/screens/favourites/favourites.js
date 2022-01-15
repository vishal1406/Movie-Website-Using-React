import React from "react";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import {
  IMAGE_BASE_URL,
  POSTER_SIZE
} from "../../utils/config";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./favourites.css";
import { removeFromFavourite } from "../../store/actions/userAction";

function Favourite(props) {
  const { favourites } = props;
  const remove = (id) => {
    let newFAvourites = favourites.filter((fav) => fav.id !== id);
    props.removeFromFavourite(newFAvourites);
  };

  return (
    <Container>
      <h1 style={{ marginLeft: "14px" }}>Favourites</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          flexWrap: "wrap",
          marginBottom: "80px",
        }}
      >
        {favourites && favourites.length > 0 ? (
          favourites.map((fav, i) => (
            <div key={i} style={{ margin: "1px" }}>
              <Link
                to={{
                  pathname: `/movie/${fav.id}`,
                  movieName: `${fav.original_title}`,
                }}
              >
                <div className="card">
                  <img
                    src={
                      fav.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${fav.poster_path}`
                        : "./images/no_image.jpg"
                    }
                    alt="moviethumb"
                    style={{ widows: "300px" }}
                  />
                </div>
              </Link>
              <div style={{ textAlign: "center" }}>
                <Button
                  style={{ backgroundColor: "#6073D6", color: "white" }}
                  onClick={() => remove(fav.id)}
                  variant="contained"
                >
                  REMOVE FROM FAVOURITE
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", marginLeft: "14px" }}>
            No Favourites Added Till Now
          </div>
        )}
      </div>
    </Container>
  );
}

function mapState(state) {
  return {
    favourites: state.userReducer.favourites,
  };
}

export default connect(mapState, { removeFromFavourite })(Favourite);
