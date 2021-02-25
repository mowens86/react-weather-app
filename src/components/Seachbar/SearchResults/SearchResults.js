import React from 'react';
import classes from './SearchResults.module.scss';

const searchResults = props => {


    return (
        <div>
            <p>{props.Description}</p>
            <p>{props.Country}</p>
        </div>
    );
};

export default searchResults;