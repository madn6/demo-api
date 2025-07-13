import React from 'react';
import PostCard from './PostCard';
import API from '../../api';

export default function PostList({ posts, onEdit, onDelete }) {
	const handleDelete = async (postId) => {
		try {
			await API.delete(`/post/delete-post/${postId}`, { withCredentials: true });
			onDelete(); // refetch posts from parent
		} catch (err) {
			console.error('Delete failed:', err);
		}
	};

	return (
		<div className="space-y-6 max-w-3xl mx-auto">
			{posts.length === 0 ? (
				<p className="text-center text-gray-500">No posts available.</p>
			) : (
				posts.map((post) => (
					<PostCard
						key={post._id}
						post={post}
						onEdit={() => onEdit(post)}
						onDelete={() => handleDelete(post._id)}
					/>
				))
			)}
		</div>
	);
}
