import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css';
import UserList from './UserList';

function App() {

return (
<div className="container">
    <Router>
        <Routes>
        <Route path="/" element={<UserList/>}></Route>
        </Routes>
    </Router>
</div>
);
}

export default App
