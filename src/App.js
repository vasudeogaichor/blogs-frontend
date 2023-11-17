import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"
import BlogList from "./components/BlogList"

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
      <Routes>
        <Route path='/' element={<BlogList />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
