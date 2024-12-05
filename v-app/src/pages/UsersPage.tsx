import React from 'react';
import UsersSearch from '../features/users/UsersSearch';
import UsersTable from '../features/users/UsersTable';
import styled from 'styled-components';


const UsersPage: React.FC = () => {

  return <StyledUsers>
    <UsersSearch/>
    <UsersTable/>
  </StyledUsers>
}

export default UsersPage;

const StyledUsers = styled.div``;