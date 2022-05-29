import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserWrapper from 'components/UserWrapper/UserWrapper';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { IUserRequestResponse } from 'types';

axios.defaults.baseURL = 'http://localhost:3001';

const WhiteBoard = React.lazy(() => import('features/WhiteBoard/WhiteBoard'));
const ModalPopup = React.lazy(() => import('features/ModalPopup/ModalPopup'));

const App = () => {
  const navigate = useNavigate();

  const postUsernameToServer = async (name: string) => {
    const {
      data: { id: userId },
    } = await axios.post<IUserRequestResponse>('/users', {
      username: name,
    });
    navigate(`/board/${userId}`, { replace: true });
  };

  return (
    <section className='entain-app'>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ModalPopup postUsername={postUsernameToServer} />
            </Suspense>
          }
        />
        <Route path='/board'>
          <Route
            path=':userId'
            element={
              <UserWrapper>
                {(props: IUserRequestResponse) => {
                  return (
                    <Suspense fallback={<LoadingSpinner />}>
                      <WhiteBoard {...props} />
                    </Suspense>
                  );
                }}
              </UserWrapper>
            }
          />
          <Route index element={<Navigate to='/' replace />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </section>
  );
};

export default App;
