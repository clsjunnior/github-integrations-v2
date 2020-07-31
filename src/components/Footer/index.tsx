import React from 'react';
import { FiHeart } from 'react-icons/fi';
import './styles.scss';

const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        Feito com <FiHeart /> por{' '}
        <a href="https://github.com/clsjunnior" target="_blank">
          Celso Junior
        </a>
      </div>
    </footer>
  );
};

export default Footer;
