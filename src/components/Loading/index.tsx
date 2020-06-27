import React, { useState, useEffect } from 'react';
import './styles.scss';
import logo from '../../assets/images/logo-loading.svg';

const Loading = () => {
  const [dismiss, setDismiss] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setDismiss(true);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [dismiss]);

  if (dismiss) return <></>;

  return (
    <div className="loader">
      <img src={logo} />
    </div>
  );
};

export default Loading;
