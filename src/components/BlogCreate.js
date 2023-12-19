import { useEffect, useState } from "react";
import { createBlog } from "../apis/blogs";
import { useNavigate } from "react-router-dom";
import LoginRequiredModal from "./Modals/LoginRequiredModal";
import SuccessModal from "./Modals/SuccessModal";

const BlogCreate = ({ isAuthenticated,  }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [isAuthenticated, navigate]);

  const closeLoginModal = () => {
    navigate("/");
    setShowLoginModal(false);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim().length) {
      alert("Please add a title");
      return;
    }

    if (!content.trim().length) {
      alert("Please add content");
      return;
    }

    createBlog({ title, content })
      .then((newBlog) => {
        setTitle("");
        setContent("");
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
      });
  };

  return (
    <>
      <div className="container-fluid ">
        <h2 className="mb-4">Create a new blog</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label h6">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
              placeholder="Enter title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label h6">
              Content:
            </label>
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
              rows="8"
              placeholder="Enter content"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <SuccessModal showModal={showSuccessModal} closeModal={closeSuccessModal} />
      <LoginRequiredModal showModal={showLoginModal} closeModal={closeLoginModal}/>
    </>
  );
};

export default BlogCreate;
