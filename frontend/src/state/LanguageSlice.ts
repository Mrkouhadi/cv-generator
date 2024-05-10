import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddLanguage, DeleteLanguageByID, GetAllLanguages, UpdateLanguage} from '../../wailsjs/go/main/App'; // Import your backend API functions
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
// Define thunk for adding a language
export const addLanguage = createAsyncThunk<Language, Language>('languages/add', async (languageData: Language) => {
  await AddLanguage(JSON.stringify(languageData));
  return languageData;
});

// Define thunk for deleting a language
export const deleteLanguage = createAsyncThunk<number, number>('languages/delete', async (languageID: number) => {
  await DeleteLanguageByID(languageID);
  return languageID;
});

// Define thunk for updating a language
export const updateLanguage = createAsyncThunk<Language, Language>('languages/update', async (languageData: Language) => {
  await UpdateLanguage(JSON.stringify(languageData));
  return languageData;
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
      })
      .addCase(addLanguage.fulfilled, (state, action) => {
        state.languages.push(action.payload);
      })
      .addCase(deleteLanguage.fulfilled, (state, action) => {
        state.languages = state.languages.filter((language) => language.ID !== action.payload);
      })
      .addCase(updateLanguage.fulfilled, (state, action) => {
        const index = state.languages.findIndex((language) => language.ID === action.payload.ID);
        if (index !== -1) {
          state.languages[index] = action.payload;
        }
      });
  }
});

export default languageSlice.reducer;
export const selectAllLanguages= (state: RootState) => state.language.languages;
export const selectLanguageByID = (state: RootState, languageID: number) => 
  state.language.languages.find(language => language.ID === languageID);