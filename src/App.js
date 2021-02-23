import React from 'react';

import Layout from './components/hoc/Layout/Layout';
import Searchbar from './components/Seachbar/Searchbar';
import Spinner from './components/UI/Spinner/Spinner';


const app = () => {

  return (
    <div>
      <Layout>
        <Searchbar />
        {/* <Spinner /> */}
      </Layout>
    </div>
  );
}

export default app;
