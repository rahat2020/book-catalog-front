import { useNavigate, useParams } from "react-router-dom"
import Topbar from "../../components/Topbar"
import { useDeleteBookMutation, useGetSinglePostQuery, usePostCommentMutation, useUpdateBookDataMutation } from "../../redux/api/apiSlice"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Footer } from "../../components/Footer";
import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Swal from "sweetalert2";

export const SingleBook = () => {
    const { _id } = useParams()
    // console.log('id', _id)
    const { data: item } = useGetSinglePostQuery(_id)
    // console.log(item)

    const [AddComment] = usePostCommentMutation()
    const [comment, setComment] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const options = {
            id: _id,
            data: { comment: comment }
        };
        try {
            const response = await AddComment(options)
            setComment('')
            if (response.data === "review created") {
                toast("Review is created")
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    }


    // updating the book data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [UpdateBook] = useUpdateBookDataMutation()
    const [title, setTitle] = useState(item?.title || '')
    const [genre, setGenres] = useState(item?.genre || '')
    const [author, setAuthor] = useState(item?.author || '')
    const [publicationDate, setpublicationDate] = useState(item?.publicationDate || '')
    const [published, setpublished] = useState(item?.published || '')
    const [file, setfile] = useState(item?.photo || '')

    console.log(file === '')
    const handleUpdateSubmit = async (event: any) => {
        event.preventDefault();
        if (file === '') {
            const data = {
                id:_id,
                title: title || item?.title || '',
                genre: genre || item?.genre || '',
                author: author || item?.author || '',
                publicationDate: publicationDate || item?.publicationDate || '',
                published: published || item?.published || '',
                photo: item?.photo || '',
            };
            console.log('data', data)
            try {
                const response = await UpdateBook(data)
                console.log('Book updated:', response);
                if (response.data === "book is updated") {
                    toast("Book is updated")
                }
            } catch (error) {
                console.error('Error updating book:', error);
            }
        } else if (file){
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "upload");
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/rahatdev1020/image/upload", data)
            const { url } = uploadRes.data

            const options = {
                id:_id,
                title: title || item?.title || '',
                genre: genre || item?.genre || '',
                author: author || item?.author || '',
                publicationDate: publicationDate || item?.publicationDate || '',
                published: published || item?.published || '',
                photo: url || item?.photo || '',
            };
            console.log('options', options)
            try {
                const response = await UpdateBook(options)
                console.log('Book added:', response);
                if (response.data === "book is updated") {
                    toast("Book is updated")
                }
            } catch (error) {
                console.error('Error updating book:', error);
            }
        }


    };

    // delete book data
    const [DeleteBook] = useDeleteBookMutation()
    const navigate = useNavigate()

    const handleDeleteBook = (_id: any) => {
        // console.log(_id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const response = DeleteBook(_id)
                    // const response = DeleteBook(options)
                    Swal.fire(
                        'Deleted!',
                        'Your book has been deleted.',
                        'success'
                    )
                    navigate('/all-books')

                } catch (error) {
                    console.error('Error deleting book:', error);
                }

            }
        })
    }



    return (
        <>
            <Topbar />
            <div className="container mt-5 pt-5 mb-4">
                <h5 className="fw-bold text-center border-bottom border-light shadow-sm rounded">Book Details</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Button variant="warning fw-bold" onClick={handleShow}>Edit</Button>
                    <Button variant="danger" onClick={() => handleDeleteBook(item._id)}>Delete</Button>
                </div>
                <Card className="shadow-sm rounded border-0">
                    <Card.Header className="fw-bold text-dark">Author: {item?.author}</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Card.Title>Name: {item?.title}</Card.Title>
                                <Card.Text>
                                    <p>Genre: {item?.genre}</p>
                                    <p>Published Date: {item?.publicationDate.slice(0, 10)}</p>
                                    <p>Published: {item?.published === true ? "Yes" : "No"}</p>
                                </Card.Text>
                            </Col>
                            <Col md={6}>
                                <div className="d-flex justify-content-end ">
                                    <img src={item?.photo} alt="book-image" className="shadow-sm rounded" style={{ width: '200px', height: '150px', objectFit: 'cover' }} loading="lazy"/>
                                </div>
                            </Col>
                        </Row>

                    </Card.Body>
                </Card>

                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update book data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="border border-1 shdaow-sm rounded p-3 bg-light">
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" placeholder="Enter book title" defaultValue={item?.title}
                                                onChange={(e) => setTitle(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Genre</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(e) => setGenres(e.target.value)}>
                                                <option>{item?.genre}</option>
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
                                            <Form.Control type="text" placeholder="Enter book title" defaultValue={item?.author} onChange={(e) => setAuthor(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Published Date</Form.Label>
                                            <Form.Control type="text" defaultValue={item?.publicationDate.slice(0, 10)} disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Set New Publication Date</Form.Label>
                                            <Form.Control type="date" placeholder="Enter book title" defaultValue={item?.publicationDate} onChange={(e) => setpublicationDate(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Is Published</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(e) => setpublished(e.target.value)}>
                                                <option>{item?.published === true ? "true" : "false"}</option>
                                                <option value="true">true</option>
                                                <option value="false">false</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Book Image</Form.Label>
                                            <Form.Control type="file" onChange={(e: any) => setfile(e.target.files[0])} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <ToastContainer />
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleUpdateSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                <div className="reviews mt-4">
                    <h5>Reviews:</h5>
                    <ListGroup as="ol" numbered className="shadow-sm rounded border-0">
                        {
                            item?.reviews?.map((item: { comment: string }, index: number) => (
                                <ListGroup.Item as="li" className="shadow-sm rounded border-0" key={index}>{item.comment}</ListGroup.Item>
                            ))
                        }

                    </ListGroup>

                    <div className="review-box mt-4">
                        <h5>Add new review</h5>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={3} placeholder="type your comments"
                                    onChange={(e) => setComment(e.target.value)} />
                            </Form.Group>
                            <Button variant="outline-success fw-bold" onClick={handleSubmit}>Add Comment</Button>
                            <ToastContainer />
                        </Form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
