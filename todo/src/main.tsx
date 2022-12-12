import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter ,Routes } from "react-router-dom";
import { App } from './App';
import Sample  from './sample';
import Auth from './auth';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/todo" element={<App />} />
      <Route path="/sample" element={<Sample />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);