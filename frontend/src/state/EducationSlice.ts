import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllEducation} from '../../wailsjs/go/main/App'; // Import your backend API functions
import { RootState } from './store';
import { Education } from '../utils/types';

interface EducationState {
  educations: Education[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EducationState = {
  educations:[],
  status: 'idle',
  error: null,
};

// Define thunk for fetching all educations
export const fetchAllEducations = createAsyncThunk<Education[],number>('educations/fetchAll', async (userID: number) => {
  const response = await GetAllEducation(userID);
  return response;
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
      });
  }
});


export default educationSlice.reducer;
export const selectAllEducations = (state: RootState) => state.education.educations;
export const selectEducationByID = (state: RootState, educationID: number) => 
  state.education.educations.find(education => education.ID === educationID);