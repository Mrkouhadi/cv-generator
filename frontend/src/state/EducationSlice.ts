import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllEducation, AddEducation, DeleteEducationByID, UpdateEducation } from '../../wailsjs/go/main/App';
import { RootState } from './store';
import { Education } from '../utils/types';

interface EducationState {
  educations: Education[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EducationState = {
  educations: [],
  status: 'idle',
  error: null,
};

// Define thunk for fetching all educations
export const fetchAllEducations = createAsyncThunk<Education[], number>('educations/fetchAll', async (userID: number) => {
  const response = await GetAllEducation(userID);
  return response;
});

// Define thunk for adding an education
export const addEducation = createAsyncThunk<Education, Education>('educations/add', async (educationData: Education) => {
  await AddEducation(JSON.stringify(educationData));
  return educationData;
});

// Define thunk for deleting an education
export const deleteEducation = createAsyncThunk<number, number>('educations/delete', async (educationID: number) => {
  await DeleteEducationByID(educationID);
  return educationID;
});

// Define thunk for updating an education
export const updateEducation = createAsyncThunk<Education, Education>('educations/update', async (educationData: Education) => {
  await UpdateEducation(JSON.stringify(educationData));
  return educationData;
});

// Define the slice
const educationSlice = createSlice({
  name: 'educations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEducations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllEducations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.educations = action.payload;
      })
      .addCase(fetchAllEducations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addEducation.fulfilled, (state, action) => {
        state.educations.push(action.payload);
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.educations = state.educations.filter((education) => education.ID !== action.payload);
      })
      .addCase(updateEducation.fulfilled, (state, action) => {
        const index = state.educations.findIndex((education) => education.ID === action.payload.ID);
        if (index !== -1) {
          state.educations[index] = action.payload;
        }
      });
  },
});

export default educationSlice.reducer;
export const selectAllEducations = (state: RootState) => state.education.educations;
export const selectEducationByID = (state: RootState, educationID: number) =>
  state.education.educations.find((education) => education.ID === educationID);
