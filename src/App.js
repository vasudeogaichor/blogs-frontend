import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"
import PostList from "./components/PostList"
import PostCreate from "./components/PostCreate"

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <div class="container-fluid mt-5">
      <Routes>
        <Route path='/' element={<PostList />} />
        <Route path='/create' element={<PostCreate />} />
      </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
