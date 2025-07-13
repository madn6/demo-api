import Post from '../model/post.model.js';


export const createPost = async (req, res) => {
	const { title, content } = req.body;

	if (!title || !content) return res.status(400).json({ message: 'title and content is missing' });

	if (!req.userId) return res.status(401).json({ message: 'Unauthorized: missing user ID' });

	try {
		const post = await Post.create({ title, content, author: req.userId });
		res.status(201).json(post);
	} catch (error) {
		console.error('Post creation failed:', error);
		res.status(500).json({ message: 'create failed', error: error.message });
	}
};

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find().populate('author', 'name');
		res.json(posts);
	} catch (error) {
		res.status(500).json({ message: 'Fetch failed' });
	}
};

export const getPostById = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(400).json({ message: 'invalid id' });

	try {
		const post = await Post.findById(id).populate('author', 'name');
		if (!post) return res.status(404).json({ message: 'not found' });
		res.json(post);
	} catch (error) {
		res.status(500).json({ mesage: 'fetch failed' });
	}
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(400).json({ message: 'invalid id' });

	const { title, content } = req.body;

	try {
		const post = await Post.findById(id);
		if (!post) return res.status(404).json({ message: 'not found' });
		if (post.author.toString() !== req.userId)
			return res.status(403).json({ message: 'unauthorized' });

		post.title = title;
		post.content = content;
		await post.save();
		res.json(post);
	} catch (error) {
		res.status(500).json({ message: 'update failed' });
	}
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!id) return res.status(400).json({ message: 'invalid id' });

	try {
		const post = await Post.findById(id);
		if (!post) return res.status(404).json({ message: 'Not found' });
		if (post.author.toString() !== req.userId)
			return res.status(403).json({ message: 'Unauthorized' });

		await post.deleteOne();
		res.json({ message: 'Deleted' });
	} catch (error) {
		res.status(500).json({ message: 'Delete failed' });
	}
};
