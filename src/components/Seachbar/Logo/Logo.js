import React from 'react';

import sunLogo from '../../../assets/sun-logo.gif';
import classes from './Logo.module.scss';

const logo = props => (
    <div>
        <img src={sunLogo} alt="My Weather" className={classes.Logo} />
    </div>
);

export default logo;