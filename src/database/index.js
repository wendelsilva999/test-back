import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';

const connection = new Sequelize(databaseConfig);

User.init(connection);
