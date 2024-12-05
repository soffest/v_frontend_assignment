import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { fetchUsers } from './usersSlice';

interface UsersSearchResultProps {

}

const UsersSearchResult: React.FC<UsersSearchResultProps> = () => {

  return <StyledSearchResult>

  </StyledSearchResult>;
}

export default UsersSearchResult;

const StyledSearchResult = styled.div``;

const StyledInput = styled.input``;