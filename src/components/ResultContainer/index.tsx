import React, { useState, useContext } from 'react';
import {
  FiGrid,
  FiMenu,
  FiX,
  FiBookmark,
  FiAlertCircle,
  FiStar,
  FiExternalLink,
  FiEye,
} from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import './styles.scss';
import { IDataResult, IRepositorie, IUserSearch } from '../../utils/Intefaces';
import InsideLoading from '../InsideLoading';
import { Languages } from '../../utils/colors-languages';
import { useHistory } from 'react-router-dom';
interface Props {
  data: IDataResult;
  total: number;
  ChangePage: (page: number) => void;
  currentPage: number;
  isLoading: boolean;
  CloseResult: () => void;
  isOpen: boolean;
}

const ResultContainer: React.FC<Props> = ({
  data,
  total,
  ChangePage,
  currentPage,
  isLoading,
  CloseResult,
  isOpen,
}) => {
  const [viewClass, setViewClass] = useState('view-grid');

  function handleViewResult(type: string) {
    setViewClass(type);
  }

  if (!isOpen) return <></>;

  return (
    <div className="result-box">
      <div className="header">
        <div className="view-mode">
          <FiGrid
            className={viewClass === 'view-grid' ? `icon active` : `icon`}
            onClick={() => {
              handleViewResult('view-grid');
            }}
          />
          <FiMenu
            className={viewClass === 'view-list' ? `icon active` : `icon`}
            onClick={() => {
              handleViewResult('view-list');
            }}
          />
        </div>
        <div className="close">
          <FiX
            className="icon"
            onClick={() => {
              CloseResult();
            }}
          />
        </div>
      </div>
      <div className="content">
        <hr />
        <div className="counter">
          <div>
            <strong>{total}</strong> <small>resultados</small>
          </div>
          <div>
            <strong>{total > 10 ? 10 * currentPage : currentPage} </strong>
            <small>de </small>
            <strong>{total}</strong>
          </div>
        </div>
        <div className={`list ${viewClass}`}>
          <InsideLoading loading={isLoading} />
          {data.repositories.length !== 0 ? (
            <>
              <ListRepositories data={data.repositories} />
            </>
          ) : (
            <>
              <ListUsers data={data.users} />
            </>
          )}
        </div>
      </div>
      <div className="footer">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={Math.ceil(total / 10)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={(e) => {
            ChangePage(e.selected === 0 ? 1 : e.selected + 1);
          }}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default ResultContainer;

interface PropsRepo {
  data: IRepositorie[];
}

export const ListRepositories: React.FC<PropsRepo> = ({ data }) => {
  function handleLanguageColor(language: string) {
    let color = Object.entries(Languages)
      .filter(([key]) => key === language)
      .map(([key, value]) => {
        return value;
      });
    return color.toString();
  }

  return (
    <>
      {data.map((item, key) => (
        <div className="item" key={key}>
          <a href={item.html_url} target="_blank" rel="noopener noreferrer">
            <div className="link-overlay">
              <FiExternalLink />
              <p>Open Project</p>
            </div>
          </a>
          <div className="title">
            <FiBookmark />
            <h2>
              {item.full_name}
              <small>
                {moment(item.updated_at).format('DD/MM/YYYY - HH:mm')}
              </small>
            </h2>
          </div>
          <div className="description">
            <p>{item.description}</p>
          </div>
          <div className="features">
            <div className="icon-group">
              <FiStar className="star" /> {item.stargazers_count}
            </div>
            <div className="icon-group">
              <FiAlertCircle className="issue" /> {item.open_issues}
            </div>
            <div className="icon-group">
              <FaCircle color={handleLanguageColor(item.language)} />{' '}
              {item.language}{' '}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

interface PropsUser {
  data: IUserSearch[];
}

export const ListUsers: React.FC<PropsUser> = ({ data }) => {
  const history = useHistory();

  async function handleGetUser(user: string) {
    try {
      sessionStorage.setItem('gitUser', user);
      history.push('/user');
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  return (
    <>
      {data.map((item, key) => (
        <div className="item item-user" key={key}>
          <div className="avatar-box">
            <div className="avatar">
              <img
                src={item.avatar_url}
                title="Github avatar"
                alt="Github Avatar"
              />
            </div>
            <div className="description">
              <h3>{item.login}</h3>
            </div>
          </div>
          <button
            onClick={() => {
              handleGetUser(item.login);
            }}
          >
            <FiEye />
          </button>
        </div>
      ))}
    </>
  );
};
