import Login from './components/Login';
import Home from './components/Home';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/helpers/RequireAuth';
import PersistLogin from './components/helpers/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/helpers/Layout';
import Register from './components/Register';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>  
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;