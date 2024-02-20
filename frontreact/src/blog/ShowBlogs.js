import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from 'react-bootstrap';

const URI = 'http://localhost:8000/blogs/';

const CompShowBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(5);

    useEffect(() => {
        getBlogs();
    }, [category, currentPage]);

    const getBlogs = async () => {
        const res = await axios.get(URI);
        setBlogs(res.data);
    }

    const deleteBlog = async (id) => {
        await axios.delete(`${URI}${id}`);
        getBlogs();
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    }

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.filter(blog => !category || blog.category === category).slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <Link to="/create" className='btn btn-primary mt-2'><i className='fas fa-plus'></i> Nueva entrada</Link>
                        <select onChange={handleCategoryChange} className='btn btn-outline-info px-3'>
                            <option value="">Todas las categorías</option>
                            <option value="general">General</option>
                            <option value="tools">Herramientas</option>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="js">Javascript</option>
                            <option value="sql">SQL</option>
                            <option value="hacking">Hacking</option>
                        </select>
                    </div>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Título</th>
                                <th>Contenido</th>
                                <th>Categoría</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBlogs.map(blog => (
                                <tr key={blog.id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.content}</td>
                                    <td>{blog.category}</td>
                                    <td>
                                        <img src={blog.imgUrl} alt="Preview" style={{ maxWidth: '70px', maxHeight: '75px' }} />
                                    </td>
                                    <td style={{ textWrap: 'nowrap' }}>
                                        <Link to={`/edit/${blog.id}`} className='btn btn-outline-info px-4'><i className='fas fa-edit'></i> Editar</Link>&nbsp;
                                        <button onClick={() => deleteBlog(blog.id)} className='btn btn-outline-danger px-4'><i className='fas fa-trash-alt'></i> Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination>
                        {[...Array(Math.ceil(blogs.filter(blog => !category || blog.category === category).length / blogsPerPage)).keys()].map(number => (
                            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

export default CompShowBlogs;
