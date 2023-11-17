import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"
import PostList from "./components/PostList"
import PostCreate from "./components/PostCreate"

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
      <Routes>
        <Route path='/' element={<PostList />} />
        <Route path='/create' element={<PostCreate />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
