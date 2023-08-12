import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

export const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
            <Container>
                <Row>
                    <Col md={6}>
                        <h3>Book Catalog</h3>
                        <p>Welcome to Book Catalog, the ultimate destination for book lovers around the world. Immerse yourself in a realm of literary wonders where your reading preferences come to life. With an extensive collection spanning various genres, languages, and eras, Book Catalog is your personalized gateway to discovering, indulging, and owning the finest literary treasures.</p>
                    </Col>
                    <Col md={3}>
                        <h3>Menus</h3>
                        <ul className="list-unstyled">
                            <li><a href="#" className='text-decoration-none fw-bold text-white'>Home</a></li>
                            <li><a href="#" className='text-decoration-none fw-bold text-white'>About</a></li>
                            <li><a href="#" className='text-decoration-none fw-bold text-white'>Services</a></li>
                            <li><a href="#" className='text-decoration-none fw-bold text-white'>Contact</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h3>Contact Us</h3>
                        <address>
                            123 Mirpur, Banani<br />
                            Dhaka, State ZIP<br />
                            <a href="bookCatalog@gmail.com" className='text-decoration-none fw-bold text-white'>bookCatalog@gmail.com</a><br />
                            <a href="tel:01456-7890" className='text-decoration-none fw-bold text-white'>+01456-7890</a>
                        </address>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
