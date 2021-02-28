import React from 'react';

import Layout from './components/hoc/Layout/Layout';
import Searchbar from './components/Seachbar/Searchbar';
import Footer from './components/Footer/Footer';


const app = () => {

  return (
    <div>
      <Layout>
        <Searchbar />
        <Footer />
      </Layout>
    </div>
  );
}

export default app;
