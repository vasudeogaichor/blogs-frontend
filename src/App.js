import './App.css';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"
import PostList from "./components/PostList"
import PostCreate from "./components/PostCreate"
import PostDetail from "./components/PostDetail"

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <Router>
      <Header setSearchResults={setSearchResults} />
      <div className="container-fluid mt-5 pt-3">
      <Routes>
        <Route path='/' element={<PostList searchResults={searchResults} />} />
        <Route path='/:postId' element={<PostDetail />} />
        <Route path='/create' element={<PostCreate />} />
      </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
