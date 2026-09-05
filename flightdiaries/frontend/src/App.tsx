import { useEffect, useState } from 'react';
import diaryService from './services/diaries';
import type { diaryEntry } from './types';

function App() {
  const [diaries, setDiaries] = useState<diaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>

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