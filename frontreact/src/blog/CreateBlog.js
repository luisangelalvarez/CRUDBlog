import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/blogs/';

const CompCreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [fileName, setFileName] = useState(''); // Nuevo estado para el nombre del archivo
    const [category, setCategory] = useState(''); // Nuevo estado para la categoría
    const navigate = useNavigate();

    // Función para extraer el nombre del archivo de la ruta
    const getFileName = (path) => {
        return path.substring(path.lastIndexOf("/") + 1);
    };

    //Guardar
    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, {
            title: title,
            content: content,
            imgUrl: fileName, // Enviar fileName en lugar de imgUrl
            category: category // Enviar la categoría
        });
        navigate('/');
    };

    const onDropHandler = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        // Obtener la URL de la imagen
        const imageUrl = URL.createObjectURL(file);
        // Actualizar el estado con la URL de la imagen
        setImgUrl(imageUrl);
        // Actualizar el estado con el nombre del archivo
        setFileName("../img/" + file.name);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImgUrl(imageUrl);
            // Actualizar el estado con el nombre del archivo
            setFileName("../img/" + file.name);
        }
    };

    return (
        <div id="tbEdit">
            <h3>Crear entrada</h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        value={title}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contenido</label>
                    <textarea
                        value={content}
                        type="text"
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-control"
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="general">General</option>
                        <option value="tools">Herramientas</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="js">Javascript</option>
                        <option value="sql">SQL</option>
                        <option value="hacking">Hacking</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="text"
                        value={getFileName(fileName)} // Mostrar solo el nombre del archivo
                        onChange={(e) => setImgUrl(e.target.value)}
                        className="form-control"
                        onDrop={onDropHandler}
                    />
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                    />
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => document.querySelector('input[type=file]').click()}
                    >
                        Seleccionar Imagen
                    </button>
                    {imgUrl && (
                        <img
                            src={imgUrl}
                            alt="Preview"
                            style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                </div>

                <button type="submit" className="btn btn-primary">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default CompCreateBlog;
