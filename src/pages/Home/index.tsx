import React from 'react';
import './styles.scss';

import Loading from '../../components/Loading';
import SearchContainer from '../../components/SearchContainer';

const Home = () => {
  return (
    <>
      <Loading />
      <main>
        <SearchContainer />
      </main>
    </>
  );
};

export default Home;
