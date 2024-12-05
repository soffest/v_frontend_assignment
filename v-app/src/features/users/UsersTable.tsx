import React from 'react';
import styled from 'styled-components';
import { selectUsersList } from './usersSlice';
import { useAppSelector } from '../../app/hooks';

const UsersTable: React.FC = () => {

  const usersList = useAppSelector(selectUsersList);

  return <StyledTable>
    {
      usersList.map((user) =>
        <StyledRow key={user.id} href={`/users/${user.id}`}>
          <div>{user.id}</div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.age}</div>
        </StyledRow>
      )
    }
  </StyledTable>;
}

export default UsersTable;

const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const StyledRow = styled.a`
  display: flex;
  gap: 100px;
`;
