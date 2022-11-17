import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Fetch } from './Fetch';
import { FetchId } from './FetchId';
import { TimeOut } from './TimeOut';

export const App = () => {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <Routes>
        <Route path='/users/:id' element={<Fetch />} />
      </Routes>
      App {number}
      <button onClick={() => setNumber((prev) => prev + 1)}>Click Button</button>
      {/* <TimeOut /> */}
      {/* <Fetch /> */}
    </div>
  );
};
