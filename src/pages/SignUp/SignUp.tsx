import { Form, Button, Row, Col } from 'react-bootstrap';
import Topbar from '../../components/Topbar';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useState } from 'react'
import { createUser } from '../../redux/user/userSlice';

const SignUp = () => {

  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e:any) => {
    e.preventDefault()
    const options = {
      email: email,
      password: password
    }
    console.log('options', options)
    dispatch(createUser(options))
  }

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
                {/* <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    className='shadow-sm border-0'
                  />
                </Form.Group> */}
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className='shadow-sm border-0 mt-3'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className='shadow-sm border-0 mt-3 mb-2'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formForgotPass">
                  <Link to="/forgotpassword">
                    <small>Forgot Password</small>
                  </Link>
                </Form.Group>

                <Button variant="outline-secondary" type="submit" className='mt-3' onClick={handleSubmit}>
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
