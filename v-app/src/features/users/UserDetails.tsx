import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUser, selectUser } from './usersSlice';
import { User } from './userConstants';

interface UserDetailsProps {
  id: User['id'];
}

const UserDetails: React.FC<UserDetailsProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  const user = useAppSelector(selectUser(id));

  return <StyledDetails>
    {user?.id}
    {user?.name}
    {user?.email}
  </StyledDetails>;
}

export default UserDetails;

const StyledDetails = styled.div``;