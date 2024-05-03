import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllSkills} from '../../wailsjs/go/main/App'; // Import your backend API functions
import { RootState } from './store';
import { Skill } from '../utils/types';

interface LanguageState {
  skills: Skill[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LanguageState = {
  skills:[],
  status: 'idle',
  error: null,
};

// Define thunk for fetching all skills
export const fetchAllSkills = createAsyncThunk<Skill[],number>('skills/fetchAll', async (userID: number) => {
  const response = await GetAllSkills(userID);
  return response;
});

// Define the slice
const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSkills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.skills = action.payload;
      })
      .addCase(fetchAllSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});


export default skillSlice.reducer;
export const selectAllSkills= (state: RootState) => state.skill.skills;
export const selectSkillByID = (state: RootState, skillID: number) => 
  state.skill.skills.find(skill => skill.ID === skillID);