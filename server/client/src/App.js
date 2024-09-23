
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useAuthContext } from "./hooks/useAuthContext";
import EditForm from "./pages/EditForm";

function App() {
  const { user } = useAuthContext()
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route path="/:id" element={<EditForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
