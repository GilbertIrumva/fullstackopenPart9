import { useState } from 'react';

import type { NewDiaryEntry, Weather, Visibility } from '../types';

interface Props {
  onSubmit: (entry: NewDiaryEntry) => void;
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [comment, setComment] = useState('');

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      date,
      visibility,
      weather,
      comment,
    });

    setDate('');
    setVisibility('great');
    setWeather('sunny');
    setComment('');
  };

  return (
    <form onSubmit={submit}>
      <div>
        Date:
        <input
          type="date"
          value={date}
          onChange={event => setDate(event.target.value)}
        />
      </div>

      <div>
        Visibility:
        <input
          type="text"
          value={visibility}
          onChange={event =>
            setVisibility(event.target.value as Visibility)
          }
        />
      </div>

      <div>
        Weather:
        <input
          type="text"
          value={weather}
          onChange={event =>
            setWeather(event.target.value as Weather)
          }
        />
      </div>

      <div>
        Comment:
        <input
          type="text"
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default DiaryForm;
