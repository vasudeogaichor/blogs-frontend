import { useState } from 'react'

const API_URL = 'http://localhost:5000/blogs';

const createBlog = async (blog) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(blog),
  });
  const data = await res.json();
  return data.message;
}

const BlogCreate = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim().length) {
      alert('Please add a title')
      return
    }

    if (!content.trim().length) {
      alert('Please add content')
      return
    }

    createBlog({ title, content })
      .then(newBlog => {
        setTitle("");
        setContent("");
        setShowModal(true);
      })
      .catch(error => {
        console.error('Error creating blog:', error);
      });
  }

  return (
    <>
      <div className="container-fluid ">
        <h2 className="mb-4">Create a new blog</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label h6">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="title"
              placeholder="Enter title" />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label h6">Content:</label>
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
              rows="8"
              placeholder="Enter content">
            </textarea>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="successModal" tabIndex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success!</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>You blog has been successfully created!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default BlogCreate