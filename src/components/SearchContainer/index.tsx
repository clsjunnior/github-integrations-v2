import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './styles.scss';
import { FiBookmark, FiUser, FiSearch, FiCompass } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import logo from '../../assets/images/github-icon.svg';
import GitHubAPI from '../../utils/GitHubAPI';
import { IRepositorie, IUserSearch, IDataResult } from '../../utils/Intefaces';
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
  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);
  const [dataResult, setDataResult] = useState<IDataResult>({
    repositories: [],
    users: [],
  });

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
      active: true,
    },
  ];

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSearch() {
    setLoadingRequest(true);
    try {
      if (formData.type === 1) {
        const resp = await GitHubAPI.getSearchRepo(
          formData.inputSearch,
          currentPage
        );
        setCount(resp.total);
        HandleDataResult(resp.repos, []);
      } else {
        const resp = await GitHubAPI.getSearchUser(
          formData.inputSearch,
          currentPage
        );
        setCount(resp.total);
        sessionStorage.setItem('search', JSON.stringify(formData));
        sessionStorage.setItem(
          'searchResp',
          JSON.stringify([resp.users, resp.total])
        );
        HandleDataResult([], resp.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRequest(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    handleSearch();
  }

  function HandleDataResult(repo: IRepositorie[], user: IUserSearch[]) {
    setDataResult({
      repositories: repo,
      users: user,
    });
    setIsOpenResult(true);
  }

  function handleCloseResult() {
    setDataResult({
      repositories: [],
      users: [],
    });
    setCurrentPage(1);
    setCount(1);
    setFormData({
      type: 0,
      inputSearch: '',
    });
    setIsOpenResult(false);
    sessionStorage.clear();
  }

  useEffect(() => {
    const data = async () => {
      if (!formData.inputSearch) return false;
      handleSearch();
    };
    data();
  }, [currentPage]);

  let searchHistory = sessionStorage.getItem('search');

  useEffect(() => {
    const data = async () => {
      if (!searchHistory) return false;
      let search = JSON.parse(sessionStorage.getItem('search') as string);
      let searchResp = JSON.parse(
        sessionStorage.getItem('searchResp') as string
      );
      setSelectedOption({
        code: search.type,
        searchLabel: '',
      });
      setFormData({
        type: search.type,
        inputSearch: search.inputSearch,
      });
      setCount(searchResp[1]);
      HandleDataResult([], searchResp[0]);
    };
    data();
  }, []);

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
                        setFormData({ type: item.code, inputSearch: '' });
                        setCurrentPage(1);
                        setCount(1);
                        setIsOpenResult(false);
                        sessionStorage.clear();
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
      <ResultContainer
        data={dataResult}
        total={count}
        ChangePage={setCurrentPage}
        currentPage={currentPage}
        isLoading={loadingRequest}
        CloseResult={handleCloseResult}
        isOpen={isOpenResult}
      />
    </>
  );
};

export default SearchContainer;
