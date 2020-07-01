import React, { useState } from 'react';
import './styles.scss';
import { FiBookmark, FiUser, FiHash, FiSearch } from 'react-icons/fi';
import logo from '../../assets/images/github-icon.svg';

import ResultContainer from '../ResultContainer/index';

const SearchContainer = () => {
  const [selectedOption, setSelectedOption] = useState({
    code: 0,
    searchLabel: '',
  });

  const options = [
    {
      code: 1,
      icon: <FiBookmark className="icon" />,
      label: 'Repositórios',
      searchLabel: 'Busca por Repositórios...',
    },
    {
      code: 2,
      icon: <FiUser className="icon" />,
      label: 'Usuários',
      searchLabel: 'Busca por Usuários...',
    },
    {
      code: 3,
      icon: <FiHash className="icon" />,
      label: 'Tópicos',
      searchLabel: 'Busca por Tópicos...',
    },
  ];

  return (
    <>
      <div className="box">
        <div className="icon-box">
          <img src={logo} alt="Github octocat" title="icon octocat" />
        </div>
        <div className="content">
          <h1>Github Integrations</h1>
          <div className="search">
            <ul>
              {options.map((item, key) => (
                <li
                  key={key}
                  onClick={() => {
                    setSelectedOption({
                      code: item.code,
                      searchLabel: item.searchLabel,
                    });
                  }}
                  className={
                    selectedOption.code === item.code ? 'selected' : ''
                  }
                >
                  {item.icon}
                  <p>{item.label}</p>
                </li>
              ))}
            </ul>
            <hr />
            <form>
              <div className="input-group">
                <input
                  type="text"
                  placeholder={
                    selectedOption.searchLabel ||
                    'Selecione o tipo da pesquisa...'
                  }
                />
                <button type="button" className="btn-search">
                  <FiSearch className="icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ResultContainer />
    </>
  );
};

export default SearchContainer;
