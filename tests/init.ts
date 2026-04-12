import dotenv from 'dotenv';
import path from 'node:path';
import { getAllUsers } from '../utils/users.util';
import { login } from '../api/auth.api';

dotenv.config({path: path.resolve(__dirname,"../.env")})


login("emilys","emilyspass")