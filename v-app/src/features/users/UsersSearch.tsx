import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchUsers, searchUsers, setQueryFilter, selectQuery, queryPrevPage, queryNextPage } from './usersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const UsersSearch: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentQuery = useAppSelector(selectQuery);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    currentQuery ? dispatch(searchUsers(currentQuery)) : dispatch(fetchUsers());;
  }, [currentQuery]);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  }

  const onSearch = () => {
    dispatch(setQueryFilter({
      name: searchText,
    }));
  }

  const onPrevClick = () => {
    dispatch(queryPrevPage());
  }
  const onNextClick = () => {
    dispatch(queryNextPage());
  }

  return <StyledSearch>
    <StyledInput name='users-search' placeholder='Search Users' onChange={onInputChange}/>
    <button onClick={onSearch}>Search</button>
    <button onClick={onPrevClick}>Prev Page</button>
    <button onClick={onNextClick}>Next Page</button>
  </StyledSearch>;
}

export default UsersSearch;

const StyledSearch = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const StyledInput = styled.input``;