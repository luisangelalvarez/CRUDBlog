//Importar la conexión
import db from "../database/db.js";
//Importamos Sequelize
import { DataTypes } from "sequelize";

const BlogModel = db.define('blogs', {
    title: {type: DataTypes.STRING},
    content: {type: DataTypes.STRING},
    imgUrl: {type: DataTypes.STRING},
    category: {type: DataTypes.STRING}
})

export default BlogModel