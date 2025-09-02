import React from 'react';
import { useState } from 'react';
import api from '../lib/api';
import { useEffect } from 'react';

export default function Products() {
	const [products, setProducts] = useState([]);
	const [editId, setEditId] = useState(null);
	const [editedValue, setEditedValue] = useState({
		productName: '',
		description: '',
		price: '',
		category: '',
		imageUrl: ''
	});

	console.log('edited value', editedValue);

	const [formValue, setFormValue] = useState({
		productName: '',
		description: '',
		price: '',
		category: '',
		imageUrl: ''
	});

	console.log('products', products);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('xxxxx', formValue);
		createProduct();
	};

	const handleFormChange = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	const handleEditChange = (e) => {
		setEditedValue({ ...editedValue, [e.target.name]: e.target.value });
	};

	const fetchProducts = async () => {
		try {
			const res = await api.get('/api/product/get-products', { withCredentials: true });
			const data = res.data;
			setProducts(data);
		} catch (err) {
			console.log(err.response?.data?.message || 'failed to fetch');
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const createProduct = async () => {
		try {
			await api.post('/api/product/create-product', formValue);
			setFormValue({
				productName: '',
				description: '',
				price: '',
				category: '',
				imageUrl: ''
			});
			fetchProducts();
		} catch (err) {
			console.log(err.response?.data?.message || 'failed to create');
		}
	};

	const handleEdit = (product) => {
		setEditId(product._id);
		setEditedValue(product);
	};

	const handleSave = async (id) => {
		try {
			await api.put(`/api/product/update-product/${id}`, editedValue, { withCredentials: true });
			setEditId(null); // exit edit mode
			fetchProducts(); // refresh list
		} catch (err) {
			console.log(err.response?.data?.message || 'failed to save');
		}
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/api/product/delete-product/${id}`, { withCredentials: true });
			fetchProducts();
			console.log('product deleted ');
		} catch (err) {
			console.log(err.response?.data?.message || 'failed to delete');
		}
	};

	return (
		<div>
			<div className="">products</div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-3 ">
					<div className="flex items-center gap-2 w-fit">
						<label htmlFor="productName">product name</label>
						<input
							type="text"
							value={formValue.productName}
							onChange={handleFormChange}
							id="productName"
							name="productName"
							className="border rounded px-2 py-1 flex-1 mr-2"
						/>
					</div>
					<div className="flex items-center gap-2 w-fit">
						<label htmlFor="description">description</label>
						<textarea
							type="text"
							value={formValue.description}
							onChange={handleFormChange}
							id="description"
							minLength={1}
							maxLength={100}
							name="description"
							className="border rounded resize-none px-2 py-1 flex-1 mr-2"
						/>
					</div>
					<div className="flex items-center gap-2 w-fit">
						<label htmlFor="price">price</label>
						<input
							type="number"
							id="price"
							value={formValue.price}
							onChange={handleFormChange}
							min={1}
							max={999999}
							name="price"
							className="border rounded px-2 py-1 flex-1 mr-2"
						/>
					</div>
					<div className="flex items-center gap-2 w-fit">
						<label htmlFor="category">category</label>
						<select
							value={formValue.category}
							onChange={handleFormChange}
							id="category"
							name="category"
						>
							<option value="options">select options</option>
							<option value="shirt">Shirt</option>
							<option value="pant">Pant</option>
							<option value="watch">Watch</option>
							<option value="shoe" selected>
								Shoe
							</option>
							<option value="orange">Orange</option>
						</select>
					</div>
					<div className="flex items-center gap-2 w-fit">
						<label htmlFor="imageUrl">Image Url</label>
						<input
							type="text"
							value={formValue.imageUrl}
							onChange={handleFormChange}
							id="imageUrl"
							name="imageUrl"
							className="border rounded px-2 py-1 flex-1 mr-2"
						/>
					</div>
				</div>
				<button type="submit" className="px-3 cursor-pointer py-2 border  rounded">
					create
				</button>
			</form>

			{products.length > 0 ? (
				<ul>
					{products.map((product) => (
						<li key={product._id} className=" p-3">
							{editId === product._id ? (
								<div className="flex flex-col w-fit">
									<input
										type="text"
										name="productName"
										value={editedValue.productName}
										onChange={handleEditChange}
									/>
									<textarea
										type="text"
										name="description"
										value={editedValue.description}
										onChange={handleEditChange}
									/>
									<input
										type="number"
										name="price"
										value={editedValue.price}
										onChange={handleEditChange}
									/>

									<select
										value={editedValue.category}
										onChange={handleEditChange}
										id="category"
										name="category"
									>
										<option value="options">select options</option>
										<option value="shirt">Shirt</option>
										<option value="pant">Pant</option>
										<option value="watch">Watch</option>
										<option value="shoe" selected>
											Shoe
										</option>
										<option value="orange">Orange</option>
									</select>
									<input type="text" name='imageUrl' value={editedValue.imageUrl} onChange={handleEditChange} />
								</div>
							) : (
								<div className="">
									<div className="font-bold">{product.productName}</div>
									<div>{product.description}</div>
									<div>₹{product.price}</div>
									<div className="text-sm text-gray-500">{product.category}</div>
									{product.imageUrl && (
										<img className="w-48 mt-2" src={product.imageUrl} alt={product.name} />
									)}
								</div>
							)}
							<div className="flex items-center gap-3">
								{editId === product._id ? (
									<div className="flex items-center gap-2">
										<button className="p-2 border rounded" onClick={() => setEditId(null)}>
											cancel
										</button>
										<button className="p-2 border rounded" onClick={() => handleSave(product._id)}>
											save
										</button>
									</div>
								) : (
									<button onClick={() => handleEdit(product)} className="px-2 border rounded-md">
										edit
									</button>
								)}
								<button
									onClick={() => handleDelete(product._id)}
									className="px-2 border rounded-md"
								>
									delete
								</button>
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className="text-gray-500">no products yet</div>
			)}
		</div>
	);
}
