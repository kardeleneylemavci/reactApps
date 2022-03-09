import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Signin from './signin';
import Signup from './Signup';
import News from './containers/News';
import NewsDetail from './containers/NewsDetail';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" caseSensitive={false} element={<Home />}/>
      <Route path="/signin" caseSensitive={false} element={<Signin />} />
      <Route path="/signup" caseSensitive={false} element={<Signup />} />
      <Route path="/news" caseSensitive={false} element={<News />} />
      <Route path="/newsDetail/:_id" caseSensitive={true} element={<NewsDetail />} />
    </Routes>
  </Router>
)

export default App;
