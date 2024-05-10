import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllExperience, AddExperience, DeleteExperienceByID, UpdateExperience } from '../../wailsjs/go/main/App';
import { RootState } from './store';
import { Experience } from '../utils/types';

interface ExperienceState {
  experiences: Experience[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ExperienceState = {
  experiences: [],
  status: 'idle',
  error: null,
};

// Define thunk for fetching all experiences
export const fetchAllExperiences = createAsyncThunk<Experience[], number>('experiences/fetchAll', async (userID: number) => {
  const response = await GetAllExperience(userID);
  return response;
});

// Define thunk for adding an experience
export const addExperience = createAsyncThunk<Experience, Experience>('experiences/add', async (experienceData: Experience) => {
  await AddExperience(JSON.stringify(experienceData));
  return experienceData;
});

// Define thunk for deleting an experience
export const deleteExperience = createAsyncThunk<number, number>('experiences/delete', async (experienceID: number) => {
  await DeleteExperienceByID(experienceID);
  return experienceID;
});

// Define thunk for updating an experience
export const updateExperience = createAsyncThunk<Experience, Experience>('experiences/update', async (experienceData: Experience) => {
  await UpdateExperience(JSON.stringify(experienceData));
  return experienceData;
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
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.experiences.push(action.payload);
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.experiences = state.experiences.filter((experience) => experience.ID !== action.payload);
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        const index = state.experiences.findIndex((experience) => experience.ID === action.payload.ID);
        if (index !== -1) {
          state.experiences[index] = action.payload;
        }
      });
  },
});

export default experienceSlice.reducer;
export const selectAllExperiences = (state: RootState) => state.experience.experiences;
export const selectExperienceByID = (state: RootState, experienceID: number) =>
  state.experience.experiences.find((experience) => experience.ID === experienceID);
