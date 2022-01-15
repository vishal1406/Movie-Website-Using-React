import React from "react";
import {
  IMAGE_BASE_URL,
  POSTER_SIZE
} from "../../utils/config";
import SearchBar from "../../shared/searchBar/SearchBar";
import FourColGrid from "../../shared/fourColGrid/FourColGrid";
import TvThumb from "../../shared/tvThumb/TvThumb";
import LoadMoreBtn from "../../shared/loadMoreBtn/LoadMoreBtn";
import Spinner from "../../shared/spinner/Spinner";
import "./TvSeries.css";

export const TvSeriesView = ({ state, searchItems, loadMoreItems }) => {
    return(
        <div className="tv">
        <SearchBar callback={searchItems} />
        <div className="tv-grid">
          <FourColGrid
            header={
              state.searchTerm ? "Search Result" : "Popular TvSeries"
            }
            loading={state.loading}
          >
            {state.tv.map((element, i) => {
              return (
                <TvThumb
                  key={i}
                  clickable={true}
                  image={
                    element.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                      : "./images/no_image.jpg"
                  }
                  tvId={element.id}
                  tvName={element.original_name}
                  vote_average={element.vote_average}
                />
              );
            })}
          </FourColGrid>
          {state.loading ? <Spinner /> : null}
          {state.currentPage <= state.totalPages &&
          !state.loading ? (
            <LoadMoreBtn text="Load More" onClick={loadMoreItems} />
          ) : null}
        </div>
      </div>
    )
}