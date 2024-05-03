import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllExperience} from '../../wailsjs/go/main/App'; // Import your backend API functions
import { RootState } from './store';
import { Experience } from '../utils/types';

interface ExperienceState {
  experiences: Experience[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExperienceState = {
  experiences:[],
  status: 'idle',
  error: null,
};

// Define thunk for fetching all experiences
export const fetchAllExperiences = createAsyncThunk<Experience[],number>('experiences/fetchAll', async (userID: number) => {
  const response = await GetAllExperience(userID);
  return response;
});

// Define the slice
const experienceSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllExperiences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllExperiences.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.experiences = action.payload;
      })
      .addCase(fetchAllExperiences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});


export default experienceSlice.reducer;
export const selectAllExperiences = (state: RootState) => state.experience.experiences;
export const selectExperienceByID = (state: RootState, experienceID: number) => 
  state.experience.experiences.find(experience => experience.ID === experienceID);