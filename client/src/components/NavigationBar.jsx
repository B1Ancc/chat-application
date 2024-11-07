import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavigationBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-decoration-none">
            Chatting
          </Link>
        </h2>
        {user && (
          <span className="text-warning">
            Chúc bạn một ngày tốt lành, {user?.name}!
          </span>
        )}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
                <Link
                  onClick={() => logoutUser()}
                  to="/dang-nhap"
                  className="link-light text-decoration-none"
                >
                  Đăng xuất
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/dang-nhap"
                  className="link-light text-decoration-none"
                >
                  Đăng nhập
                </Link>
                <Link to="/dang-ky" className="link-light text-decoration-none">
                  Đăng ký
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
