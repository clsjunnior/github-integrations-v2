import React from 'react';
import './styles.scss';
import { IUser } from '../../utils/Intefaces';

import {
  FiX,
  FiAtSign,
  FiMail,
  FiMapPin,
  FiBookmark,
  FiHeart,
  FiUserPlus,
  FiMessageSquare,
  FiExternalLink,
  FiBriefcase,
} from 'react-icons/fi';

interface Props {
  show: boolean;
  type: string;
  data: IUser;
}

const Modal: React.FC<Props> = ({ show, type, data }) => {
  if (!show) return <></>;

  return (
    <div className="modal">
      <div className="content">
        <div className="avatar">
          <img src={data?.avatar_url} />
        </div>
        <h3>
          {data?.name}
          <small>{data?.login}</small>
        </h3>
        <div className="perfil">
          <div className="status">
            <div>
              <FiBookmark />
              {data?.public_repos}
              <small>Repositórios</small>
            </div>
            <div>
              <FiHeart />
              {data?.followers}
              <small>Seguidores</small>
            </div>
            <div>
              <FiUserPlus />
              {data?.following}
              <small>Seguindo</small>
            </div>
          </div>
          <div className="info">
            {data.bio && (
              <div>
                <FiMessageSquare />
                <span>{data?.bio}</span>
              </div>
            )}
            {data.company && (
              <div>
                <FiBriefcase />
                <span>{data?.company}</span>
              </div>
            )}
            {data.location && (
              <div>
                <FiMapPin />
                <span>{data?.location}</span>
              </div>
            )}
            {data.email && (
              <div>
                <FiMail />
                {data?.email}
              </div>
            )}
            {data.blog && (
              <div>
                <FiAtSign />
                <a href={data?.blog}> {data?.blog}</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer">
        <a href={data.html_url} target="_blank">
          <button>
            {' '}
            <FiExternalLink /> Perfil Completo{' '}
          </button>
        </a>
      </div>
    </div>
  );
};

export default Modal;
