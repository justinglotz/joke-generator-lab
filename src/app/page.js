'use client';

import { React, useState } from 'react';
import getJoke from '../api/jokes';

export default function JokeGenerator() {
  const [joke, setJoke] = useState(null);
  const [punchline, setPunchline] = useState(null);
  const [showPunchline, setShowPunchline] = useState(false);

  const handleGetJoke = async () => {
    if (showPunchline) {
      // Reset to fetch a new joke
      setJoke(null);
      setPunchline(null);
      setShowPunchline(false);
    } else if (!joke) {
      // Fetch a new joke
      const newJoke = await getJoke();
      setJoke(newJoke.setup);
      setPunchline(newJoke.delivery);
    } else {
      // Show punchline
      setShowPunchline(true);
    }
  };

  const getButtonText = () => {
    if (showPunchline) return 'Get Another Joke';
    if (joke) return 'Get Punchline';
    return 'Get A Joke';
  };
  const jokeGenStyle = {
    border: '1px solid white',
    width: '40%',
  };
  return (
    <div style={jokeGenStyle}>
      <button type="button" onClick={handleGetJoke}>
        {getButtonText()}
      </button>
      {!joke ? <p>Click the button to receive a random joke.</p> : ''}
      {joke && <p>{joke}</p>}
      {showPunchline && punchline && <p>{punchline}</p>}
    </div>
  );
}
