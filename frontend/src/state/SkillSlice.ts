import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddSkill, DeleteSkillByID, GetAllSkills, UpdateSkill} from '../../wailsjs/go/main/App'; // Import your backend API functions
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
// Define thunk for adding a skill
export const addSkill = createAsyncThunk<Skill, Skill>('skills/add', async (skillData: Skill) => {
  await AddSkill(JSON.stringify(skillData));
  return skillData;
});

// Define thunk for deleting a skill
export const deleteSkill = createAsyncThunk<number, number>('skills/delete', async (skillID: number) => {
  await DeleteSkillByID(skillID);
  return skillID;
});

// Define thunk for updating a skill
export const updateSkill = createAsyncThunk<Skill, Skill>('skills/update', async (skillData: Skill) => {
  await UpdateSkill(JSON.stringify(skillData));

  return skillData;
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
      })
      
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((skill) => skill.ID !== action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex((skill) => skill.ID === action.payload.ID);
        if (index !== -1) {
          state.skills[index] = action.payload;
        }
      });
  }
});


export default skillSlice.reducer;
export const selectAllSkills= (state: RootState) => state.skill.skills;
export const selectSkillByID = (state: RootState, skillID: number) => 
  state.skill.skills.find(skill => skill.ID === skillID);