import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setStateUser } from '../redux/user/userSlice';
import { auth } from '../firebase/firease';
import { signOut } from 'firebase/auth';



function Topbar() {

  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setStateUser(null))
    }).catch((error: any) => {
      console.log(error);
    });

  }

  return (
    <Navbar expand="lg" className="bg-light" fixed="top">
      <Container>
        <Navbar.Brand>
          <Link to="/" className='text-decoration-none text-dark shadow-sm rounded fw-bold px-2 py-1'>Book Catalog</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto fw-bold  my-2 my-lg-0 text-center d-flex justify-content-center align-items-center"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link><Link to="/all-books" className='text-decoration-none text-dark'>All Books</Link></Nav.Link>
            {
              user.email === null ? " " :
                <Nav.Link><Link to="/add-new" className='text-decoration-none text-dark'>Add New Book</Link></Nav.Link>
            }
            {
              user.email === null ?
                <>
                  <Nav.Link ><Link to="/login" className='text-decoration-none text-dark'>Login</Link></Nav.Link>
                </>
                :
                <Nav.Link onClick={handleLogout} className="text-dark fw-bold">Logout</Nav.Link>
            }
            <Nav.Link>
              <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnMRBVny69Hii_1IH-jpKOya1QhHlCMVxc-UV-gPM&s" alt="user-image"
                    style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }}
                    loading='lazy'
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-1">{user.email}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;