import { MongoClient } from "mongodb";
import mongoDbConfig from "../config/db.js";

const dbClient = new MongoClient(mongoDbConfig.connectionString);

export default { dbClient };
