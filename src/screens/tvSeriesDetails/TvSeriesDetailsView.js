import React from "react";
import TvInfo from "../../shared/tvInfo/TvInfo";
import Spinner from "../../shared/spinner/Spinner";
import CommentBox from "../../shared/commentBox/CommentBox";
import "./TvSeriesDetails.css";

export const TvSeriesDetailsView = ({ state, tvId }) => {
  return (
    <div className="tv">
      {state.tv ? (
        <div>
          <TvInfo tv={state.tv} />
        </div>
      ) : null}
      {state.loading ? <Spinner /> : null}
      <CommentBox tvId={tvId} />
    </div>
  );
};
