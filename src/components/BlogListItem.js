import { useEffect, useState } from "react";
import { formatDateTime } from "../utils";
import { Alert } from "react-bootstrap";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import { deleteBlog } from "../apis/blogs";
import { listBlogs } from '../apis/blogs';

const BlogListItem = ({ id, title, content, createdAt, isAuthenticated, setAllBlogs }) => {
  const [visible, setVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState("");
  const [notificationVariant, setNotificationVariant] = useState('');

  const trimmedContent = content.slice(0, 500);

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
          setNotificationVariant("success")
          setDeleteAlertMessage("Blog deleted successfully!");
          setShowDeleteAlert(true);
        } else {
          setNotificationVariant("danger")
          setDeleteAlertMessage("Error while deleting!");
          setShowDeleteAlert(true);
        }
      })
      .catch((error) => {
        setNotificationVariant("danger")
        setDeleteAlertMessage("Error while deleting!");
        setShowDeleteAlert(true);
        console.log("Error: Unable to delete blog", error);
      });
  };

  useEffect(() => {
    let timer;
    if (visible) {
      timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    setVisible(showDeleteAlert);
  }, [showDeleteAlert]);

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
            const blogs = await listBlogs();
            setAllBlogs(blogs.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    fetchBlogs();
}, [visible]);

  return (
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <h3 className="mb-0">{title}</h3>
        <div className="mb-1 text-muted">{formatDateTime(createdAt)}</div>
        <p className="card-text mb-auto">{trimmedContent}</p>
        <a href={`/${id}`}>Continue reading</a>
        {isAuthenticated && (
          <div className="mt-auto">
            <div className="d-flex justify-content-between">
              {/* delete button */}
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
              {/* edit button */}
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
        )}
      </div>
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
      <Alert
        show={visible}
        variant={notificationVariant}
        onClose={() => {
          setVisible(false)
        }}
        dismissible
      >
        {deleteAlertMessage}
      </Alert>
    </div>
  );
};

export default BlogListItem;
