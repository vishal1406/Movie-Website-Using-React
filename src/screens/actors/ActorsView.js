import React from "react";
import {
  IMAGE_BASE_URL,
  POSTER_SIZE
} from "../../utils/config";
import SearchBar from "../../shared/searchBar/SearchBar";
import FourColGrid from "../../shared/fourColGrid/FourColGrid";
import ActorsThumb from "../../shared/actorsThumb/ActorThumb";
import LoadMoreBtn from "../../shared/loadMoreBtn/LoadMoreBtn";
import Spinner from "../../shared/spinner/Spinner";
import "./Actors.css";
export const ActorsView = ({ state, searchItems, loadMoreItems }) =>{
    return(
        <div className="actor">
        <SearchBar callback={searchItems} />
        <div className="actor-grid">
          <FourColGrid
            header={state.searchTerm ? "Search Result" : "Popular Actors"}
            loading={state.loading}
          >
            {state.person.map((element, i) => {
              return (
                <ActorsThumb
                  key={i}
                  clickable={true}
                  image={
                    element.profile_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.profile_path}`
                      : "./images/no_image.jpg"
                  }
                  personId={element.id}
                  personName={element.name}
                  popularity={element.popularity}
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