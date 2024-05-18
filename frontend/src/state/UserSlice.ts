import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllUsers, AddUser, DeleteUserByID, UpdateUser, GetUserByID } from '../../wailsjs/go/main/App'; // Import your backend API functions
import { RootState } from './store';
import { User } from '../utils/types';

interface UserState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: 'idle',
  error: null,
};

// Define thunk for fetching all users
export const fetchAllUsers = createAsyncThunk<User[]>('users/fetchAll', async () => {
  const response = await GetAllUsers();
  return response;
});

// Define thunk for adding a user
export const addUser = createAsyncThunk<User, User>('users/add', async (userData:User) => {
  await AddUser(JSON.stringify(userData));
  return userData;
});

// Define thunk for deleting a user
export const deleteUser = createAsyncThunk<number, {UserId: number, File: string}>('users/delete', async ({UserId,File}) => {
    await DeleteUserByID(UserId,File);
    return UserId; // return the UserId
  });

// Define thunk for updating a user
export const updateUser = createAsyncThunk<User, User>('users/update', async (userData:User) => {
    await UpdateUser(JSON.stringify(userData));
    console.log("slice: ", userData)
    return userData;
  });

// Define thunk for fetching a single user
export const fetchUserByID = createAsyncThunk<User, number>('users/fetchByID', async (userID: number) => {
  const response = await GetUserByID(userID);
  return response;
});

// Define the slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.ID !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.ID === action.payload.ID);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(fetchUserByID.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.ID === action.payload.ID);
        if (index !== -1) {
          state.users[index] = action.payload;
        } else {
          state.users.push(action.payload);
        }
      });
  }
});
export default userSlice.reducer;
export const selectAllUsers = (state: RootState) => state.user.users;
export const selectUserByID = (state: RootState, userID: number) => 
  state.user.users.find(user => user.ID === userID);
