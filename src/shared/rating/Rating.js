import React from "react";
import StarRatingComponent from "react-star-rating-component";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
    };
  }

  componentDidMount() {
    const url = "http://localhost:7070/api/ratingByMovie/";
    const endpoint = `${url}${this.props.movieId}`;
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          rating: response,
        });
      })
      .then((response) => console.log(this.state.rating))
      .catch((error) => console.error("Error:", error));
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
    console.log(this.state);
    const url = "http://localhost:7070/api/ratings";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: nextValue,
        movieId: this.props.movieId,
        userId: sessionStorage.getItem("authenticatedUser"),
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser")
      );
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <h3>OnGrid Rating: {rating}</h3>
        <StarRatingComponent
          name="rate1"
          starCount={10}
          value={rating}
          emptyStarColor={`#fff`}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
export default Rating;
