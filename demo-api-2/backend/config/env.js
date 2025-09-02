//env configuration

import dotenv from 'dotenv';

dotenv.config();

export const config = {
	PORT: Number(process.env.PORT || 5000),
	MONGO_URI: process.env.MONGO_URI || '',
   NODE_ENV: process.env.NODE_ENV || 'development',
   JWT_SECRET:process.env.JWT_SECRET || ""
};
