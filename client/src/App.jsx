import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar"

function App() {
  return (
    <>
    <NavigationBar />
    <Container>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
    </>
  );
}

export default App;
