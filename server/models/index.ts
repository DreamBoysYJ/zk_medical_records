import {Sequelize} from 'sequelize';
import User from './user';
import config_dev from "../config/config_dev";


const env: string = process.env.NODE_ENV || 'development';
const config = config_dev;
const db: any = {};
//초기 값이 없어서 데이터 타입이 추론이 안되기에 as를 사용해 데이터 타입을 설정 해 준다.

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.User = User


User.initModel(sequelize);





export default db;
