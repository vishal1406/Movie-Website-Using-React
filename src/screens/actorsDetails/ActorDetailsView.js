import React from 'react';
import ActorInfo from '../../shared/actorInfo/ActorInfo';
import Spinner from '../../shared/spinner/Spinner';
import './ActorDetails.css';

export const ActorDetailsView = ({state})=>{
    console.log(state);
    return (
        <div className="actor">
            {state.person ?
                <div>
                    <ActorInfo person={state.person}/>
                </div>
            : null}
            {state.loading ? <Spinner /> : null}
        </div>
        );
    }