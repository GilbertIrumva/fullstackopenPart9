import { useState } from 'react';
import type { NewDiaryEntry, Weather, Visibility } from '../types';

interface Props {
  onSubmit: (entry: NewDiaryEntry) => void;
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [comment, setComment] = useState('');

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      date,
      weather,
      visibility,
      comment,
    });

    setDate('');
    setWeather('sunny');
    setVisibility('great');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>

      <form onSubmit={submit}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={event => setDate(event.target.value)}
            />
          </label>
        </div>

        <div>
          <p>Visibility:</p>

          <label>
            <input
              type="radio"
              value="great"
              checked={visibility === 'great'}
              onChange={() => setVisibility('great')}
            />
            Great
          </label>

          <label>
            <input
              type="radio"
              value="good"
              checked={visibility === 'good'}
              onChange={() => setVisibility('good')}
            />
            Good
          </label>

          <label>
            <input
              type="radio"
              value="ok"
              checked={visibility === 'ok'}
              onChange={() => setVisibility('ok')}
            />
            Ok
          </label>

          <label>
            <input
              type="radio"
              value="poor"
              checked={visibility === 'poor'}
              onChange={() => setVisibility('poor')}
            />
            Poor
          </label>
        </div>

        <div>
          <p>Weather:</p>

          <label>
            <input
              type="radio"
              value="sunny"
              checked={weather === 'sunny'}
              onChange={() => setWeather('sunny')}
            />
            Sunny
          </label>

          <label>
            <input
              type="radio"
              value="rainy"
              checked={weather === 'rainy'}
              onChange={() => setWeather('rainy')}
            />
            Rainy
          </label>

          <label>
            <input
              type="radio"
              value="cloudy"
              checked={weather === 'cloudy'}
              onChange={() => setWeather('cloudy')}
            />
            Cloudy
          </label>

          <label>
            <input
              type="radio"
              value="stormy"
              checked={weather === 'stormy'}
              onChange={() => setWeather('stormy')}
            />
            Stormy
          </label>

          <label>
            <input
              type="radio"
              value="windy"
              checked={weather === 'windy'}
              onChange={() => setWeather('windy')}
            />
            Windy
          </label>
        </div>

        <div>
          <label>
            Comment:
            <input
              type="text"
              value={comment}
              onChange={event => setComment(event.target.value)}
            />
          </label>
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;