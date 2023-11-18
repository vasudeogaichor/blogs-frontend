import { useState, useEffect } from 'react';
import PostListItem from "./PostListItem"

const API_URL = 'http://localhost:5000/posts';

const listPosts = async () => {
    const res = await fetch(API_URL)
    const posts = await res.json()
    return posts.message
}

const PostList = () => {

    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const posts = await listPosts();
                setAllPosts(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            {allPosts.map((post) => <PostListItem key={post?.id} title={post?.title} content={post.content} createdAt={post.created_at} />)}
        </>
    )
}

export default PostList