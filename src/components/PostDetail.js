import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/posts';

const getPost = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    console.log('res - ', res)
    const post = await res.json()
    return post.message
}

const PostDetail = () => {
    const { postId } = useParams();
    const [currentPost, setCurrentPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await getPost(postId);
                setCurrentPost(post);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, []);

    return (
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">{currentPost.title}</h3>
                <div className="mb-1 text-muted">{currentPost.created_at}</div>
                <p className="card-text mb-auto">{currentPost.content}</p>
            </div>
        </div>
    )
}

export default PostDetail