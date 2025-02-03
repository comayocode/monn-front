import { useState } from 'react';

function Hero() {
  const [text, setText] = useState('Texto del Hero');

  return (
    <div>
      <h2>About me</h2>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>{text}</p>
    </div>
  );
}

export default Hero;
