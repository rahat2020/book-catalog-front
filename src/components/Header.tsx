import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

export const Header = () => {
    return (
        <div className="mt-4 pt-4 mb-5 pb-5 p-5 h-100 sm-p-0">
            <div className="container">
                <div className="d-flex justify-content-center align-items-center">
                <div className="w-50">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search book name"
                            className="me-2 shadow-sm border-1 border-top"
                            aria-label="Search"
                        />
                        <Button variant="outline-success fw-bold">Search</Button>
                    </Form>
                </div>
                </div>
            </div>
        </div>
    )
}
