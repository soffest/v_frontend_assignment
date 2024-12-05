import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GET_USER, GET_USERS, getQueryKey, PAGE_SIZE, SEARCH_USERS, User, UsersSearchQuery, UsersSearchResults } from './userConstants';
import { RootState } from "../../app/store";

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch(GET_USERS);
    const result = await response.json();
    return result;
  }
);

export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async (query: UsersSearchQuery) => {
    const response = await fetch(SEARCH_USERS, {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result: UsersSearchResults = await response.json();
    return result;
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id: User['id']) => {
    const response = await fetch(GET_USER(id));
    const result = await response.json();
    return result;
  }
);

interface UsersStateAll { // Contains actual user data of all the users
  [key: User['id']]: User;
}

export interface UsersState {
  all_users: UsersStateAll;
  filtered_users: { // Contains IDs of users for a specific query
    [key: string]: User['id'][];
  };
  currentQuery?: UsersSearchQuery;
}


const initialState: UsersState = {
  all_users: {},
  filtered_users: {},
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setQueryFilter: (state, action: PayloadAction<UsersSearchQuery['filter']>) => {
      state.currentQuery = {
        filter: action.payload,
        page: 0,
        pageSize: PAGE_SIZE,
      };
    },
    queryNextPage: (state) => {
      state.currentQuery = {
        ...state.currentQuery,
        page: state.currentQuery?.page !== undefined ?  state.currentQuery?.page + 1 : 0
      }
    },
    queryPrevPage: (state) => {
      state.currentQuery = {
        ...state.currentQuery,
        page: ( state.currentQuery?.page && state.currentQuery.page > 0 ) ?  state.currentQuery.page - 1 : 0
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.all_users = action.payload.reduce((mapped: UsersStateAll, user: User) => {
        mapped[user.id] = user;
        return mapped;
      }, {} as UsersStateAll)
    }).addCase(searchUsers.fulfilled, (state, action) => {
        const searchResultMap = action.payload.reduce((mapped: UsersStateAll, user: User) => {
          mapped[user.id] = user;
          return mapped;
        }, {} as UsersStateAll);

        state.all_users = {
          ...state.all_users,
          ...searchResultMap
        };
        state.filtered_users = {
          ...state.filtered_users,
          [JSON.stringify(state.currentQuery)]: Object.keys(searchResultMap).map((key) => parseInt(key)),
        }
      }
    ).addCase(fetchUser.fulfilled, (state, action) => {
      state.all_users[action.payload.id] = action.payload;
    }
  )
  },
});

// Selectors
export const selectUsersList = (state: RootState) => {
  if (state.users.currentQuery) {
    const queryResults = state.users.filtered_users[getQueryKey(state.users.currentQuery)];
    return queryResults ? queryResults.map((id) => state.users.all_users[id]) : [];
  }

  return Object.values(state.users.all_users);
};
export const selectUser = (id: User['id']) => (state: RootState, ) => {
  return state.users.all_users[id]
};

export const selectQuery = (state: RootState, ) => {
  return state.users.currentQuery
};


export const { setQueryFilter, queryNextPage, queryPrevPage } = usersSlice.actions;

export default usersSlice.reducer;