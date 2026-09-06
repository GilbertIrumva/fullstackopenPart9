import { useEffect, useState } from 'react';
import axios from 'axios';

import diaryService from './services/diaries';
import type { DiaryEntry, NewDiaryEntry } from './types';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  const addDiary = (entry: NewDiaryEntry) => {
    setError(null);

    diaryService.create(entry)
      .then(data => {
        setDiaries(current => current.concat(data));
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.error?.[0]?.message ||
            'Failed to create diary entry'
          );
        } else {
          setError('Failed to create diary entry');
        }
      });
  };

  return (
    <div>
      <h1>Flight Diaries</h1>

      {error && (
        <div style={{ color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

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
