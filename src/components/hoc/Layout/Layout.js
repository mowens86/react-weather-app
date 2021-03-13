import React from 'react';
import classes from './Layout.module.scss';

const layout = props => {

    return (
            <div className={classes.Cloud}>
                <main className={classes.Layout}>
                    {props.children}
                </main>
            </div>
    )
};

export default layout;