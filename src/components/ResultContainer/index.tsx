import React from 'react';
import {
  FiGrid,
  FiMenu,
  FiX,
  FiBookmark,
  FiAlertCircle,
  FiStar,
} from 'react-icons/fi';
import { FaCircle } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import './styles.scss';

const ResultContainer = () => {
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
            <strong>100</strong> <small>resultados</small>
          </div>
          <div>
            <strong>10 </strong>
            <small>de</small>
            <strong> 100</strong>
          </div>
        </div>
        <div className="list">
          <div className="item">
            <div className="title">
              <FiBookmark />
              <h2>
                Repo name
                <small>update at</small>
              </h2>
            </div>
            <div className="description">
              <p>lorem ipsun</p>
            </div>
            <div className="features">
              <div className="icon-group">
                <FiStar /> stars
              </div>
              <div className="icon-group">
                <FiAlertCircle /> stars
              </div>
              <div className="icon-group">
                <FaCircle /> language
              </div>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <FiBookmark />
              <h2>
                Repo name
                <small>update at</small>
              </h2>
            </div>
            <div className="description">
              <p>lorem ipsun</p>
            </div>
            <div className="features">
              <div className="icon-group">
                <FiStar /> stars
              </div>
              <div className="icon-group">
                <FiAlertCircle /> stars
              </div>
              <div className="icon-group">
                <FaCircle /> language
              </div>
            </div>
          </div>
          <div className="item">
            <div className="title">
              <FiBookmark />
              <h2>
                Repo name
                <small>update at</small>
              </h2>
            </div>
            <div className="description">
              <p>lorem ipsun</p>
            </div>
            <div className="features">
              <div className="icon-group">
                <FiStar /> stars
              </div>
              <div className="icon-group">
                <FiAlertCircle /> stars
              </div>
              <div className="icon-group">
                <FaCircle /> language
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          // breakLabel={'...'}
          // breakClassName={'break-me'}
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={() => {
            console.log('change');
          }}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default ResultContainer;
