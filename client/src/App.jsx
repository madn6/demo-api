import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import PostPage from './pages/PostPage';
import SignUp from '../../client/src/pages/SignUp'	
import SignIn from '../../client/src/pages/SignIn'	
export default function App() {
	return (
		<Router>
			<div className="min-h-screen p-6 bg-gray-50">
				<h1 className="text-2xl font-bold mb-4">Task Manager</h1>

				{/* Navigation */}
				<nav className="space-x-4 mb-6">
					<Link to="/" className="text-blue-600 hover:underline">Tasks</Link>
					<Link to="/posts" className="text-blue-600 hover:underline">Posts</Link>
					<Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
					<Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
				</nav>

				{/* Routes */}
				<Routes>
					<Route
						path="/"
						element={
							<>
								<TaskForm />
								<TaskList />
							</>
						}
					/>
					<Route path="/posts" element={<PostPage />} />
					<Route path="/register" element={<SignUp onRegister={() => console.log('Registered')} />} />
					<Route path="/login" element={<SignIn onLogin={() => console.log('Logged in')} />} />
				</Routes>
			</div>
		</Router>
	);
}
