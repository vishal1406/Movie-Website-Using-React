import React, { Component } from "react";
import {
  API_URL,
  API_KEY
} from "../../utils/config";
import { TvSeriesView } from "./TvSeriesView";
import "./TvSeries.css";

class TvSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tv: [],
      loading: false,
      currentPage: 0,
      totalPages: 0,
      searchTerm: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endpoint);
  }

  searchItems = (searchTerm) => {
    let endpoint = "";
    this.setState({
      tv: [],
      loading: true,
      searchTerm,
    });

    if (searchTerm === "") {
      endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  loadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });

    if (this.state.searchTerm === "") {
      endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${
        this.state.currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          tv: [...this.state.tv, ...result.results],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  render() {
    return (
      <TvSeriesView
        state={this.state}
        searchItems={this.searchItems}
        loadMoreItems={this.loadMoreItems}
      />
    );
  }
}

export default TvSeries;
