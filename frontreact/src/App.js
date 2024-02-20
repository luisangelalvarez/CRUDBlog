import './App.css';

//importamos los componentes
import CompShowBlogs from './blog/ShowBlogs.js';
import CompCreateBlog from './blog/CreateBlog.js'
import CompEditBlog from './blog/EditBlog.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span id="AppHeader">CheatSheets recopiladas</span>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompShowBlogs />} />
          <Route path='/create' element={<CompCreateBlog />} />
          <Route path='/edit/:id' element={<CompEditBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
