import { useEffect, useState } from 'react';

export const TimeOut = () => {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    const stop = setInterval(() => {
      console.log('interval', 1);
      setNumber((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(stop);
      console.log('cleanup function setNumber', 2);
    };
  }, [number]);

  useEffect(() => {
    const stop = setInterval(() => {
      console.log('interval', 1);
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(stop);
      console.log('cleanup function setCount', 2);
    };
  }, []);

  return (
    <div>
      TimeOut {number} {count} {text}
      <button onClick={() => setText((prev) => (prev.length ? '' : 'interval'))}>
        Click Button
      </button>
      <input type='text' value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};
