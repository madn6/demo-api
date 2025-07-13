import React, { useState, useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import API from '../../api';

export default function PostPage() {
	const [posts, setPosts] = useState([]);
	const [editingPost, setEditingPost] = useState(null);

	// Fetch posts from server
	const fetchPosts = async () => {
		try {
			const res = await API.get('/post/get-posts');
			setPosts(res.data);
		} catch (err) {
			console.error('Failed to fetch posts:', err);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 py-10 px-4">
			<PostForm
				onPostCreated={fetchPosts}
				editingPost={editingPost}
				setEditingPost={setEditingPost}
			/>

			<hr className="my-8 border-gray-300" />

			<PostList posts={posts} onEdit={setEditingPost} onDelete={fetchPosts} />
		</div>
	);
}
