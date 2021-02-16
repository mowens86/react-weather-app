import React from 'react';

import Logo from './Logo/Logo';
import Input from './Input/Input';
import ToggleCF from './ToggleCF/ToggleCF';
import classes from './Searchbar.module.scss';

const searchbar = props => {

    return (
        <ul className={classes.Searchbar}>
            <li>
                <Logo />
            </li>
            <li>
                <Input />
            </li>
            <li>
                <div className={classes.ToggleWrapper}>
                    C <ToggleCF /> F
                </div>
            </li>
        </ul>
    )
};

export default searchbar;