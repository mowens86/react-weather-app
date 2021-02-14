import React from 'react';
import classes from './Searchbar.module.scss';

const searchbar = props => {

    return (
        <ul className={classes.Searchbar}>
            <li>Logo</li>
            <li>Searchbar</li>
            <li>CF Toggler</li>
        </ul>
    )
};

export default searchbar;