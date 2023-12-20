import { useState } from "react";
import { formatDateTime } from "../utils";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import { deleteBlog } from "../apis/blogs";
import { listBlogs } from "../apis/blogs";

const BlogListItem = ({
  id,
  title,
  content,
  createdAt,
  isAuthenticated,
  setAllBlogs,
  setShowDeleteAlert,
  setAlertVariant,
  setDeleteAlertMessage,
  visible,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const trimmedContent = content.slice(0, 500);
  const [likes, setLikes] = useState(5);
  const [comments, setComments] = useState(5);

  const handleDeleteButtonClicked = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    deleteBlog(id)
      .then((status) => {
        if (status === 204) {
          setAlertVariant("success");
          setDeleteAlertMessage("Blog deleted successfully!");
          setShowDeleteAlert(true);
          listBlogs()
            .then((blogs) => {
              setAllBlogs(blogs.data);
            })
            .catch((error) =>
              console.log("Error: Error getting blogs: ", error)
            );
        } else {
          setAlertVariant("danger");
          setDeleteAlertMessage("Error while deleting!");
          setShowDeleteAlert(true);
        }
      })
      .catch((error) => {
        setAlertVariant("danger");
        setDeleteAlertMessage("Error while deleting!");
        setShowDeleteAlert(true);
        console.log("Error: Unable to delete blog", error);
      });
  };

  return (
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <h3 className="mb-0">{title}</h3>
        <div className="mb-1 text-muted">{formatDateTime(createdAt)}</div>
        <p className="card-text mb-auto">{trimmedContent}</p>
        <a href={`/${id}`}>Continue reading</a>
        {/* <div className="d-flex justify-content-between mt-2"> */}
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setLikes(likes + 1)}
            >
              Like ({likes})
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setComments(comments + 1)}
            >
              Comment ({comments})
            </button>
            </div>
            <div className="d-flex flex-row-reverse">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleDeleteButtonClicked}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
            </div>
          </div>
        {/* </div> */}
        {/* {isAuthenticated && ( */}
        {/* <div className="mt-auto"> */}
        <div className="d-flex justify-content-between">

        </div>
        {/* </div> */}
        {/* )} */}
      </div>
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default BlogListItem;
