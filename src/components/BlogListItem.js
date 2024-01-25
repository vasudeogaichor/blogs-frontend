import { useState } from "react";
import { formatDateTime } from "../utils";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import { deleteBlog, listBlogs, likeBlog } from "../apis/blogs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiCommentDetail, BiSolidCommentDetail } from "react-icons/bi";
import LikeIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import { useNavigate } from "react-router-dom";

const BlogListItem = ({
  blog,
  setAllBlogs,
  setShowDeleteAlert,
  setAlertVariant,
  setDeleteAlertMessage,
  loggedInUser
}) => {
  const {id, content, createdAt, title, likes, comments } = blog;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const trimmedContent = content.slice(0, 500);
  const [blogLikes, setBlogLikes] = useState(likes.length);
  const [blogComments, setBlogComments] = useState(comments.length);
  const navigate = useNavigate();

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

  const handleLike = () => {
    if (loggedInUser) {
      const action = likes.includes(loggedInUser.userId) ? 'remove' : 'add'

      likeBlog(id, { userId: loggedInUser.userId, action })
        .then((likesCount) => {
          console.log('likesCount - ', likesCount)
          setBlogLikes(likesCount)
        })
        .catch(err => {
          console.log('Error: Error while adding/removing like: ', err)
        })
    }
  }

  return (
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <h3 className="mb-0">{title}</h3>
        <div className="mb-1 text-muted">{formatDateTime(createdAt)}</div>
        <p className="card-text mb-auto">{trimmedContent}</p>
        <a href={`/${id}`}>Continue reading</a>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-row">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleLike}
            >
              <AiOutlineLike /> ({blogLikes})
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setBlogComments(blogComments + 1)}
            >
              <BiCommentDetail /> ({blogComments})
            </button>
          </div>
          <div className="d-flex flex-row-reverse">
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
          </div>
        </div>
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
// TODO - Move svg files to separate files