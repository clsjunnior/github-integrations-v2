import React from 'react';
import {
  FiGrid,
  FiMenu,
  FiX,
  FiBookmark,
  FiAlertCircle,
  FiStar,
  FiExternalLink,
} from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import './styles.scss';
import { IRepositorie } from '../../utils/GitHubAPI';
import InsideLoading from '../InsideLoading';
import { Languages } from '../../utils/colors-languages';
interface Props {
  repo: IRepositorie[];
  total: number;
  ChangePage: (page: number) => void;
  currentPage: number;
  isLoading: boolean;
}

const ResultContainer: React.FC<Props> = ({
  repo,
  total,
  ChangePage,
  currentPage,
  isLoading,
}) => {
  function handleLanguageColor(language: string) {
    let color = Object.entries(Languages)
      .filter(([key]) => key === language)
      .map(([key, value]) => {
        return value;
      });
    return color.toString();
  }

  return (
    <div className="result-box">
      <div className="header">
        <div className="view-mode">
          <FiGrid className="icon" />
          <FiMenu className="icon" />
        </div>
        <div className="close">
          <FiX className="icon" />
        </div>
      </div>
      <div className="content">
        <hr />
        <div className="counter">
          <div>
            <strong>{total}</strong> <small>resultados</small>
          </div>
          <div>
            <strong>{10 * currentPage} </strong>
            <small>de </small>
            <strong>{total}</strong>
          </div>
        </div>
        <div className="list">
          <InsideLoading loading={isLoading} />
          {repo.map((item, key) => (
            <div className="item" key={key}>
              <a href={item.html_url} target="_blank">
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
                  <FiStar /> {item.stargazers_count}
                </div>
                <div className="icon-group">
                  <FiAlertCircle /> {item.open_issues}
                </div>
                <div className="icon-group">
                  <FaCircle color={handleLanguageColor(item.language)} />{' '}
                  {item.language}{' '}
                </div>
              </div>
            </div>
          ))}
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
