import dotenv from 'dotenv';
import path from 'node:path';
import { getAllUsers } from '../utils/users.util';

dotenv.config({path: path.resolve(__dirname,"../.env")})


getAllUsers()