import React from 'react';
import classes from './Footer.module.scss';

const footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer>
            <div className={classes.Footer}>
                <p>© {year}, This app was built with React by Michael Owens(<a href="https://www.mowenstech.com/" rel="noreferrer" target="_blank">View Portfolio</a>). Data powered by Open Weather API.</p>
            </div>
        </footer>
    )
};

export default footer;