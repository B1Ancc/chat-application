import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

const Login = () => {
  return (
    <>
      <Form>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Đăng nhập</h2>
              <Form.Control type="email" placeholder="Email" />
              <Form.Control type="password" placeholder="Mật khẩu" />
              <Button variant="primary" type="submit">
                Đăng nhập
              </Button>
              <Alert variant="danger">
                <p>Đã có lỗi xảy ra.</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
