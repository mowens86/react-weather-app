import React from 'react';

const footer = () => {

    const year = new Date().getFullYear();

    return (
        <footer>
            <div>
                <p>© {year}, This app was built with React by Michael Owens. Data powered by Open Weather API.</p>
            </div>
        </footer>
    )
};

export default footer;