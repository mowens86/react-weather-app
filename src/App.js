import React from 'react';

import Layout from './components/hoc/Layout/Layout';
import Searchbar from './components/Seachbar/Searchbar';
import Footer from './components/Footer/Footer';


const app = () => {

  return (
      <Layout>
        <Searchbar />
        <Footer />
      </Layout>
  );
}

export default app;
