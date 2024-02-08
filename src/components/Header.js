import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listBlogs } from "../apis/blogs";
import { useAuth } from "../AuthContext";

const Header = ({ setSearchResults }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm?.trim()?.length) {
      return;
    }
    
    listBlogs({ query: searchTerm })
      .then((result) => {
        setSearchTerm("");
        setSearchResults(result);
      })
      .catch((error) => {
        console.error("Error in searching blogs:", error);
        // TODO - add red dismissable bootstrap alert
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/')
  }

  return (
    <header className="d-flex flex-wrap mb-4 fixed-top opacity-animation">
      <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              id="logo"
              src="./logo.svg"
              alt="Blogs Logo"
              width="30"
              height="28"
            />
            Blogs
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/create"
                  className="nav-link active"
                  aria-current="page"
                >
                  Create
                </Link>
              </li>
              {!user ? (
                <li className="nav-item">
                  <Link to="/login" className="nav-link active" aria-current="page">
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link active" aria-current="page">
                    Logout
                  </button>
                </li>
              )}
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
