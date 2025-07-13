import React from 'react';

export default function PostCard({ post, onEdit, onDelete }) {
	return (
		<div className="bg-white p-6 rounded shadow border border-gray-200">
			<h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
			<p className="text-gray-700 mt-2 whitespace-pre-line">{post.content}</p>

			<div className="mt-4 flex justify-end gap-4">
				<button onClick={onEdit} className="text-blue-600 hover:underline">
					Edit
				</button>
				<button onClick={onDelete} className="text-red-600 hover:underline">
					Delete
				</button>
			</div>
		</div>
	);
}
