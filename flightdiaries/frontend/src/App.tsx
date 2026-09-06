import { useEffect, useState } from 'react';

import diaryService from './services/diaries';

import type { DiaryEntry, NewDiaryEntry } from './types';

import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  const addDiary = (entry: NewDiaryEntry) => {
    diaryService.create(entry).then(data => {
      setDiaries(current => current.concat(data));
    });
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      <DiaryForm onSubmit={addDiary} />

      {diaries.map(diary => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;