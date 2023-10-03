import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import './App.css';

function Home() {
  return <h1>Home</h1>
}

function Categories() {
  return <h1>Categories</h1>
}

function About() {
  return <h1>About</h1>
}

function App() {
  return (
   <BrowserRouter>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/categories'>Categories</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </ul>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/categories' element={<Categories />}></Route>
      <Route path='/about' element={<About />}></Route>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
