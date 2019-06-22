import React, { Fragment, useEffect } from 'react';

import SearchBar from './components/layout/SearchBar';
import AddBtn from './components/layout/AddBtn';
import AddLogModal from './components/layout/AddLogModal';
import AddTechModal from './components/techs/AddTechModal';
import TechListModal from './components/techs/TechListModal';
import Logs from './components/Logs/Logs';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });

  return (
    <Fragment>
      <SearchBar />
      <div className='container'>
        <Logs />
      </div>
      <AddBtn />
      <AddLogModal />
      <AddTechModal />
      <TechListModal />
    </Fragment>
  );
};

export default App;
