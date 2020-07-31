import React from 'react';
import './styles.scss';

import Loading from '../../components/Loading';
import SearchContainer from '../../components/SearchContainer';
import Footer from '../../components/Footer';

const Home = () => {
  return (
    <>
      <Loading />
      <main>
        <SearchContainer />
        <Footer />
      </main>
    </>
  );
};

export default Home;
