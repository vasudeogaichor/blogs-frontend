import { useState, useEffect } from "react";
import { createBlog, editBlog, getBlog } from "../apis/blogs";
import SuccessModal from "./Modals/SuccessModal";
import FailureModal from "./Modals/FailureModal";
import { useParams } from 'react-router-dom';

const BlogCreate = () => {
  const { blogId } = useParams();
  const isEdit = blogId ? true : false;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
        try {
            const blog = await getBlog(blogId);
            setTitle(blog.title)
            setContent(blog.content)
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    fetchBlog();
}, [blogId]);

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const closeFailureModal = () => {
    setShowFailureModal(false);
  }

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

    if (isEdit) {
      editBlog(blogId, { title, content })
        .then((editedBlog) => {
          if (editedBlog.Error) {
            setShowFailureModal(true);
          } else {
            setShowSuccessModal(true);
          }
        })
        .catch((error) => {
          console.error("Error editing blog:", error);
        })
    } else {
      createBlog({ title, content })
        .then((newBlog) => {
          setTitle("");
          setContent("");
          setShowSuccessModal(true);
        })
        .catch((error) => {
          console.error("Error creating blog:", error);
        });
    }
  };

  return (
    <>
      <div className="container-fluid ">
        <h2 className="mb-4">{isEdit ? 'Edit old blog' : 'Create a new blog'}</h2>

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

      <SuccessModal showModal={showSuccessModal} closeModal={closeSuccessModal} successMessage='Your blog has been successfully created / updated!' />
      <FailureModal showModal={showFailureModal} closeModal={closeFailureModal} errorMessage='Failed to create/update blog.' />
    </>
  );
};

export default BlogCreate;
