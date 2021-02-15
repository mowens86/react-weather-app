import React from 'react';

import Logo from './Logo/Logo';
import Input from './Input/Input';
import classes from './Searchbar.module.scss';

const searchbar = props => {

    return (
        <ul className={classes.Searchbar}>
            <li>
                <Logo />
            </li>
            <li><Input /></li>
            <li>CF Toggler</li>
        </ul>
    )
};

export default searchbar;