import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
	{
		productName: {
			type: String,
			required: [true, 'product name is required'],
			trim: true,
			minLength: [2, 'name must be least 2 characters'],
			maxLength: [100, 'name can be max 100 chars']
		},
		description: {
			type: String,
			required: [true, 'description is required'],
			trim: true,
			maxLength: [1000, 'description can be max 1000 char']
		},
		price: {
			type: Number,
			required: [true, 'price is required'],
			min: [0, 'price cannot negative']
		},
		category: {
			type: String,
			required: [true, 'Category is reqired'],
			trim: true,
		},
		imageUrl: {
			type: String,
			required: true,
			trim: true,
			default: 'https://via.placeholder.com/150'
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Product', productSchema);
