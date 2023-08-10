import Topbar from "../../components/Topbar"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Footer } from "../../components/Footer";
import { Col, Row } from "react-bootstrap";
import {  useState } from "react";
import { useAddNewBookMutation } from "../../redux/api/apiSlice";
import { useAppDispatch } from "../../redux/hooks";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNew = () => {

    const [AddBook] = useAddNewBookMutation()


    const [title, setTitle] = useState('')
    const [genre, setGenres] = useState('')
    const [author, setAuthor] = useState('')
    const [publicationDate, setpublicationDate] = useState('')
    const [published, setpublished] = useState('')
    const [file, setfile] = useState('')

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/rahatdev1020/image/upload", data)
        const { url } = uploadRes.data

        const options = {
            title,
            genre,
            author,
            publicationDate,
            published,
            photo:url
        };
        console.log('options', options)
        try {
            const response = await AddBook(options)
            //   const response = await dispatch(AddBook(options)).unwrap();
            console.log('Book added:', response);
            if (response.data === "book created") {
                toast("Book is created")
            }
            setTitle('')
            setGenres('')
            setAuthor('')
            setpublicationDate('')
            setpublished('')
            setfile('')
        } catch (error) {
            console.error('Error adding book:', error);
            // Handle error, display a message, etc.
        }
    };

    return (
        <div>
            <Topbar />
            <div className="addNew mt-5 mb-5 pt-5 d-flex justify-content-center align-items-center">
                <div className="w-75">
                    <h4 className="text-dark">Add New Book</h4>
                    <Form className="border border-1 shdaow-sm rounded p-3 bg-light" onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter book title" onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => setGenres(e.target.value)}>
                                        <option>Open this to select genre</option>
                                        <option value="Horror">Horror</option>
                                        <option value="Romantic">Romantic</option>
                                        <option value="Action">Action</option>
                                        <option value="Fiction">Fiction</option>
                                        <option value="Science Fiction">Science Fiction</option>
                                        <option value="Novel">Novel</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" placeholder="Enter book title" onChange={(e) => setAuthor(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Publication Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter book title" onChange={(e) => setpublicationDate(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Is Published</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => setpublished(e.target.value)}>
                                        <option>Open this menu</option>
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Book Image</Form.Label>
                                    <Form.Control type="file" onChange={(e:any) => setfile(e.target.files[0])}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <ToastContainer />


                        <Button variant="outline-success" type="submit">
                            Add Books
                        </Button>
                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddNew
