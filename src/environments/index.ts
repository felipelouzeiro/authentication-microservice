require('dotenv').config();

export const environment = {
  CONNECTION_DATABASE: process.env.CONNECTION_DATABASE || '',
  DATABASE_ENCRYPTION_KEY: process.env.DATABASE_ENCRYPTION_KEY || '',
  JWT_KEY: process.env.JWT_KEY || '',
};
