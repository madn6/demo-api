import Product from '../models/Product.model.js';

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'failed to get products  ' });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { productName, description, price, category, imageUrl } = req.body;
		if (!productName || !description || !price || !category || !imageUrl) {
			return res.status(400).json({ message: 'missing field' });
		}

		const product = await Product.create({
			productName,
			description,
			price,
			category,
			imageUrl
		});

		res.status(201).json(product);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: ' faild to create ' });
	}
};

export const updateProduct = async (req, res) => {
	try {req
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

		if (!product) {
			return res.status(400).json({ message: 'no product to update' });
		}

		res.status(200).json(product);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'failed to ' });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);

		if (!product) {
			return res.status(400).json({ message: 'no product to delete' });
		}

		res.status(200).json('product deleted');
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'failed to ' });
	}
};
