import React, { Component } from "react";
import { API_URL, API_KEY } from "../../utils/config";
import { MovieDetailsView } from "./MovieDetailsView";
import "./MovieDetails.css";
import { connect } from "react-redux";
import { addToFavourite } from "../../store/actions/userAction";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      directors: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        if (result.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: result, loading: false });
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  render() {
    return (
      <MovieDetailsView
        state={this.state}
        addToFavourite={this.props.addToFavourite}
        favourites={this.props.favourites}
        movieId={this.props.match.params.movieId}
      />
    );
  }
}

function mapState(state) {
  return {
    favourites: state.userReducer.favourites,
  };
}

export default connect(mapState, { addToFavourite })(Movie);
