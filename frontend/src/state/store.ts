// store.ts
import { configureStore } from '@reduxjs/toolkit';
import EducationSlice from './EducationSlice';
import ExperienceSlice from './ExperienceSlice';
import languageSlice from './LanguageSlice';
import SkillSlice from './SkillSlice';
import userSlice from './UserSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    education:EducationSlice,
    experience:ExperienceSlice,
    language:languageSlice,
    skill:SkillSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
