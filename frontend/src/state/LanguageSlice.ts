import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllLanguages} from '../../wailsjs/go/main/App'; // Import your backend API functions
import { RootState } from './store';
import { Language } from '../utils/types';

interface LanguageState {
  languages: Language[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LanguageState = {
  languages:[],
  status: 'idle',
  error: null,
};

// Define thunk for fetching all languages
export const fetchAllLanguages = createAsyncThunk<Language[],number>('languages/fetchAll', async (userID: number) => {
  const response = await GetAllLanguages(userID);
  return response;
});

// Define the slice
const languageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLanguages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllLanguages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.languages = action.payload;
      })
      .addCase(fetchAllLanguages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});


export default languageSlice.reducer;
export const selectAllLanguages= (state: RootState) => state.language.languages;
export const selectLanguageByID = (state: RootState, languageID: number) => 
  state.language.languages.find(language => language.ID === languageID);