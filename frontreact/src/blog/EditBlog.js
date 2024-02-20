import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/blogs/';

const CompEditBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [fileName, setFileName] = useState('');
    const [category, setCategory] = useState(''); // Asegúrate de que category tenga un valor inicial válido
    const navigate = useNavigate();
    const { id } = useParams();

    const getFileName = (path) => {
        return path.substring(path.lastIndexOf("/") + 1);
    };

    const update = async (e) => {
        e.preventDefault();
        await axios.put(URI + id, {
            title: title,
            content: content,
            imgUrl: fileName,
            category: category
        });
        navigate('/');
    };

    useEffect(() => {
        const getBlogById = async () => {
            const res = await axios.get(URI + id);
            setTitle(res.data.title);
            setContent(res.data.content);
            setImgUrl(res.data.imgUrl);
            setFileName(getFileName(res.data.imgUrl));
            setCategory(res.data.category);
        };

        getBlogById();
    }, [id]);

    const onDropHandler = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const imageUrl = URL.createObjectURL(file);
        setImgUrl(imageUrl);
        setFileName("../img/" + file.name);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImgUrl(imageUrl);
            setFileName("../img/" + file.name);
        }
    };

    return (
        <div id="tbEdit">
            <h3>Editar entrada</h3>
            <form onSubmit={update}>
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
                    <label className="form-label">Contenido</label>
                    <textarea
                        value={content}
                        type="text"
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="text"
                        value={getFileName(fileName)}
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

export default CompEditBlog;
