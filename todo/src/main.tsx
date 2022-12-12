import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter ,Routes } from "react-router-dom";
import { App } from './App';
import Sample  from './sample';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/todo" element={<App />} />
        <Route path="/sample" element={<Sample />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);