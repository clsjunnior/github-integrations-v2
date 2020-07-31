import React, { useState, useContext, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Modal from '../../components/Modal';
import { IUser } from '../../utils/Intefaces';
import GitHubAPI from '../../utils/GitHubAPI';

import { useHistory } from 'react-router-dom';
import './styles.scss';
import Footer from '../../components/Footer';

const User: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser);

  const history = useHistory();

  function goBack() {
    sessionStorage.removeItem('gitUser');
    history.push('/');
  }

  let user = sessionStorage.getItem('gitUser');
  useEffect(() => {
    const data = async () => {
      if (user === null) return false;
      handleGetUser(user);
    };
    data();
  }, [user]);

  async function handleGetUser(user: any) {
    try {
      const resp = await GitHubAPI.getUser(user);
      setSelectedUser(resp);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main style={{ position: 'relative' }}>
        <div
          className="go-back"
          onClick={() => {
            goBack();
          }}
        >
          <FiArrowLeft /> Voltar
        </div>
        <Modal show={showModal} type="Users" data={selectedUser} />
      </main>
      <Footer />
    </>
  );
};

export default User;
