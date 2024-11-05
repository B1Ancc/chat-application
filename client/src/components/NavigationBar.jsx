import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            Chatting
          </Link>
        </h2>
        <span className="text-warning">Hiện đang đăng nhập dưới tên: Bú cặc chó</span>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            <Link to="/dang-nhap" className="link-light text-decoration-none">
            Đăng nhập
            </Link>
            <Link to="/dang-ky" className="link-light text-decoration-none">
            Đăng ký
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
