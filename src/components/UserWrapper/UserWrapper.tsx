import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { IUserRequestResponse } from 'types';
import axios from 'axios';

interface ComponentPropsInterface {
  readonly children: (props: IUserRequestResponse) => React.ReactElement;
}

const UserWrapper = ({ children }: ComponentPropsInterface) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userStatus, setUserStatus] = useState<IUserRequestResponse>();
  const { userId } = useParams();
  const navigate = useNavigate();

  const routeToHome = () => {
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const fetchUserStatus = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<IUserRequestResponse>(
          `/users/${userId}`
        );
        setUserStatus(data);
        if (!data.id) routeToHome();
      } catch (err) {
        routeToHome();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserStatus();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return React.createElement(children, userStatus);
};

export default UserWrapper;
