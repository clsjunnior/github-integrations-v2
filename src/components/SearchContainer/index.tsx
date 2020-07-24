import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './styles.scss';
import {
  FiBookmark,
  FiUser,
  FiHash,
  FiSearch,
  FiCompass,
} from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import logo from '../../assets/images/github-icon.svg';

import GitHubAPI, { IRepositorie } from '../../utils/GitHubAPI';
import ResultContainer from '../ResultContainer/index';

const SearchContainer = () => {
  const [selectedOption, setSelectedOption] = useState({
    code: 0,
    searchLabel: '',
  });
  const [formData, setFormData] = useState({
    type: 0,
    inputSearch: '',
  });
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<IRepositorie[]>([]);

  const options = [
    {
      code: 1,
      icon: <FiBookmark className="icon" />,
      label: 'Repositórios',
      searchLabel: 'Busca por Repositórios...',
      active: true,
    },
    {
      code: 2,
      icon: <FiUser className="icon" />,
      label: 'Usuários',
      searchLabel: 'Busca por Usuários...',
      active: false,
    },
    {
      code: 3,
      icon: <FiHash className="icon" />,
      label: 'Tópicos',
      searchLabel: 'Busca por Tópicos...',
      active: false,
    },
  ];

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoadingRequest(true);
    try {
      const resp = await GitHubAPI.getSearchRepo(
        formData.inputSearch,
        currentPage
      );
      setCount(resp.total);
      setRepositories(resp.repos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRequest(false);
    }
  }

  function handleCloseResult() {
    setRepositories([]);
    setCurrentPage(1);
    setCount(1);
    setFormData({
      type: 0,
      inputSearch: '',
    });
  }

  useEffect(() => {
    const data = async () => {
      if (!formData.inputSearch) return false;
      try {
        setLoadingRequest(true);
        const resp = await GitHubAPI.getSearchRepo(
          formData.inputSearch,
          currentPage
        );
        setCount(resp.total);
        setRepositories(resp.repos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingRequest(false);
      }
    };
    data();
  }, [currentPage]);

  return (
    <>
      <div className="box">
        <div className="icon-box">
          <img src={logo} alt="Github octocat" title="icon octocat" />
        </div>
        <div className="content">
          <h1>
            <FiCompass /> Github Explore
          </h1>
          <div className="search">
            <ul>
              {options.map((item, key) => (
                <React.Fragment key={key}>
                  {item.active ? (
                    <li
                      key={key}
                      onClick={() => {
                        setSelectedOption({
                          code: item.code,
                          searchLabel: item.searchLabel,
                        });
                        setFormData({ ...formData, type: item.code });
                      }}
                      className={
                        selectedOption.code === item.code ? 'selected' : ''
                      }
                    >
                      {item.icon}
                      <p>{item.label}</p>
                    </li>
                  ) : (
                    <li
                      key={key}
                      className={`disabled`}
                      title="Implementação em breve..."
                    >
                      {item.icon}
                      <p>{item.label}</p>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder={
                    selectedOption.searchLabel ||
                    'Selecione o tipo da pesquisa...'
                  }
                  name="inputSearch"
                  id="inputSearch"
                  onChange={handleInputChange}
                  value={formData.inputSearch}
                />
                <button
                  type="submit"
                  className="btn-search"
                  disabled={loadingRequest}
                >
                  {loadingRequest ? (
                    <AiOutlineLoading3Quarters className="spin icon" />
                  ) : (
                    <FiSearch className="icon" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {repositories.length !== 0 && (
        <ResultContainer
          repo={repositories}
          total={count}
          ChangePage={setCurrentPage}
          currentPage={currentPage}
          isLoading={loadingRequest}
          CloseResult={handleCloseResult}
        />
      )}
    </>
  );
};

export default SearchContainer;
