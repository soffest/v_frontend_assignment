import React from 'react';
import UserDetails from '../features/users/UserDetails';
import styled from 'styled-components';

import { useParams } from "react-router-dom";

const UsersDetailsPage: React.FC = () => {
  const { id } = useParams();

  return <StyledUsers>
    {id && <UserDetails id={parseInt(id)}/>}
  </StyledUsers>
}

export default UsersDetailsPage;

const StyledUsers = styled.div``;