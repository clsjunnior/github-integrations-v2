import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './styles.scss';

interface Props {
  loading: boolean;
}

const InsideLoading: React.FC<Props> = ({ loading }) => {
  if (!loading) return <></>;

  return (
    <div className="inside-loader">
      <AiOutlineLoading3Quarters className="spin" />
    </div>
  );
};

export default InsideLoading;
