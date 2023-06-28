import React from 'react';
import './css/global.css'
import { Home } from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TaskModal } from './components/TaskModal';

export function App() {
  return (
    <Router>
      <Routes>
        <Route exact='true' path='/' element={<Home />} />
        <Route exact='true' path='/editartarea/:tarea_id' element={<Home />} />
      </Routes>
    </Router>
  );
}
