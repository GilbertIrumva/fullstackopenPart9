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
        <p>Visibility:</p>

        <label>
          <input
            type="radio"
            name="visibility"
            value="great"
            checked={visibility === 'great'}
            onChange={() => setVisibility('great')}
          />
          Great
        </label>

        <label>
          <input
            type="radio"
            name="visibility"
            value="good"
            checked={visibility === 'good'}
            onChange={() => setVisibility('good')}
          />
          Good
        </label>

        <label>
          <input
            type="radio"
            name="visibility"
            value="ok"
            checked={visibility === 'ok'}
            onChange={() => setVisibility('ok')}
          />
          Ok
        </label>

        <label>
          <input
            type="radio"
            name="visibility"
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
            name="weather"
            value="sunny"
            checked={weather === 'sunny'}
            onChange={() => setWeather('sunny')}
          />
          Sunny
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="rainy"
            checked={weather === 'rainy'}
            onChange={() => setWeather('rainy')}
          />
          Rainy
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="cloudy"
            checked={weather === 'cloudy'}
            onChange={() => setWeather('cloudy')}
          />
          Cloudy
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="stormy"
            checked={weather === 'stormy'}
            onChange={() => setWeather('stormy')}
          />
          Stormy
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="windy"
            checked={weather === 'windy'}
            onChange={() => setWeather('windy')}
          />
          Windy
        </label>
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
