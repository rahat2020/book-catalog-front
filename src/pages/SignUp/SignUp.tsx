import { Form, Button, Row, Col } from 'react-bootstrap';
import Topbar from '../../components/Topbar';
import { Link } from 'react-router-dom';

const SignUp = () => {

  return (
    <>
      <Topbar />
      <div className="" style={{ overflow: 'hidden' }}>
        <Row>
          <Col md={6}>
            <div className=" w-100 h-100">
              <img src="https://images.pexels.com/photos/3368816/pexels-photo-3368816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="books" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
            </div>
          </Col>
          <Col md={6} className='bg-light'>
            <div className="d-flex justify-content-center align-items-center container" style={{ width: '100%', height: '100vh' }}>
              <Form >
                <h4 className="text-center text-dark">welcome! Sign up</h4>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter username"
                    className='shadow-sm border-0'
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className='shadow-sm border-0 mt-3'
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className='shadow-sm border-0 mt-3 mb-2'
                  />
                </Form.Group>
                <Form.Group controlId="formForgotPass">
                  <Link to="/forgotpassword">
                    <small>Forgot Password</small>
                  </Link>
                </Form.Group>

                <Button variant="outline-secondary" type="submit" className='mt-3'>
                  Sign up
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

      </div>
    </>
  );
};

export default SignUp;
