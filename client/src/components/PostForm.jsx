import React, { useState, useEffect } from 'react';
import API from '../../api';

export default function PostForm({ onPostCreated, editingPost, setEditingPost }) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	// Prefill form when editing
	useEffect(() => {
		if (editingPost) {
			setTitle(editingPost.title);
			setContent(editingPost.content);
		}
	}, [editingPost]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (editingPost) {
				await API.put(`/post/update-post/${editingPost._id}`, { title, content }, { withCredentials: true });
				setEditingPost(null);
			} else {
				await API.post('/post/create-post', { title, content }, { withCredentials: true });
			}

			setTitle('');
			setContent('');
			onPostCreated(); // refetch posts
		} catch (err) {
			console.error('Failed to save post:', err);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white shadow-md rounded p-6 max-w-xl mx-auto space-y-4"
		>
			<h2 className="text-xl font-semibold text-gray-800">
				{editingPost ? 'Edit Post' : 'Create a New Post'}
			</h2>

			<input
				type="text"
				className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Post title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>

			<textarea
				className="w-full border border-gray-300 px-4 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
				rows={5}
				placeholder="Write your content..."
				value={content}
				onChange={(e) => setContent(e.target.value)}
				required
			/>

			<div className="flex justify-end">
				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
				>
					{editingPost ? 'Update Post' : 'Create Post'}
				</button>
			</div>
		</form>
	);
}
