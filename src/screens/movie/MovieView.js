import React from "react";
import {
  IMAGE_BASE_URL,
  POSTER_SIZE
} from "../../utils/config";
import SearchBar from "../../shared/searchBar/SearchBar";
import FourColGrid from "../../shared/fourColGrid/FourColGrid";
import MovieThumb from "../../shared/movieThumb/MovieThumb";
import LoadMoreBtn from "../../shared/loadMoreBtn/LoadMoreBtn";
import Spinner from "../../shared/spinner/Spinner";
import "./Movie.css";

export const MovieView = ({ state, searchItems, loadMoreItems }) => {
  return (
    <div className="home">
      <SearchBar callback={searchItems} />
      <div className="home-grid">
        <FourColGrid
          header={state.searchTerm ? "Search Result" : "Popular Movies"}
          loading={state.loading}
        >
          {state.movies.map((element, i) => {
            return (
              <MovieThumb
                key={i}
                clickable={true}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : "./images/no_image.jpg"
                }
                movieId={element.id}
                movieName={element.original_title}
                vote_average={element.vote_average}
                release_date={element.release_date}
              />
            );
          })}
        </FourColGrid>
        {state.loading ? <Spinner /> : null}
        {state.currentPage <= state.totalPages && !state.loading ? (
          <LoadMoreBtn text="Load More" onClick={loadMoreItems} />
        ) : null}
      </div>
    </div>
  );
};
