import { useState } from "react";
import { formatDateTime } from "../utils";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import { deleteBlog, listBlogs, handleBlogLike, handleBlogComment } from "../apis/blogs";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";

import LikeIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import { useNavigate } from "react-router-dom";
import LoginRequiredModal from "./Modals/LoginRequiredModal";
import AddCommentModal from "./Modals/AddCommentModal";

const BlogListItem = ({
  blog,
  setAllBlogs,
  setShowDeleteAlert,
  setAlertVariant,
  setDeleteAlertMessage,
  loggedInUser
}) => {
  const { id, content, createdAt, title, likes, comments, user: createdByUser } = blog;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const trimmedContent = content.slice(0, 500);
  const [blogLikes, setBlogLikes] = useState(likes.length);
  const [blogComments, setBlogComments] = useState(comments.length);
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteButtonClicked = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const closeCommentModal = () => {
    setShowAddCommentModal(false)
  }

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

  const handleAddRemoveLike = () => {
    if (loggedInUser) {
      const action = likes.includes(loggedInUser.userId) ? 'remove' : 'add'

      handleBlogLike(id, { userId: loggedInUser.userId, action })
        .then((result) => {
          if (result.Error) {
            if (result.Error === 'Unauthorized - Invalid token') {
              setShowLoginRequiredModal(true);
            }
          } else {
            setBlogLikes(result.data.likes.length)
          }
        })
        .catch(err => {
          console.log('Error: Error while adding/removing like: ', err)
        })
    } else {
      setShowLoginRequiredModal(true)
    }
  }

  const addNewComment = (comment) => {
    const commentPayload = {
      action: 'add',
      userId: loggedInUser.userId,
      text: comment
    }

    handleBlogComment(id, commentPayload)
      .then(result => {
        if (result.Error) {
          if (result.Error === 'Unauthorized - Invalid token') {
            setShowLoginRequiredModal(true);
          }
        } else {
          setBlogComments(result.data.comments.length)
        }
      })
      .catch(error => {
        console.log('Error while updating comments: ', error)
      })
  }

  const handleCommentButtonClicked = () => {
    if (loggedInUser) {
      setShowAddCommentModal(true)
    } else {
      setShowLoginRequiredModal(true)
    }
  }

  return (
    <div className="slideup-opacity-animation row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <h2 className="mb-0">{title}</h2>
        <h6 className="fw-light">by {createdByUser.username}</h6>
        <div className="mb-1 text-muted">{formatDateTime(createdAt)}</div>
        <p className="card-text mb-auto">{trimmedContent}</p>
        <a href={`/${id}`}>Continue reading</a>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleAddRemoveLike}
            >
              <AiOutlineLike /> ({blogLikes})
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCommentButtonClicked}
            >
              <BiCommentDetail /> ({blogComments})
            </button>
          </div>
          {(loggedInUser?.userId === createdByUser._id ) && (<div className="d-flex flex-row-reverse">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleDeleteButtonClicked}
            >
              <LikeIcon />
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => {
                navigate(`/${id}/edit`);
              }}
            >
              <EditIcon />
            </button>
          </div>)}
        </div>
      </div>
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
      />
      <LoginRequiredModal showModal={showLoginRequiredModal} />
      <AddCommentModal showModal={showAddCommentModal}
        handleAddComment={addNewComment}
        closeModal={closeCommentModal} />
    </div>
  );
};

export default BlogListItem;