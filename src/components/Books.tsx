import Table from 'react-bootstrap/Table';
import { useGetAllPostQuery } from '../redux/api/apiSlice';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Books = () => {
    const { data } = useGetAllPostQuery(undefined)
    const [searchQuery, setSearchQuery] = useState('');
    const filteredData = data?.filter((item: { title: string, author: string, genre: string }) =>
        item?.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="container mb-4">
            <div className="mt-4 pt-4 mb-5 pb-5 p-5 h-100 sm-p-0">
                <h3 className="text-center border-bottom border-light">Search books by name</h3>
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="w-50">
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search book name"
                                    className="me-2 shadow-sm border-1 border-top"
                                    aria-label="Search"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="text-center border-bottom border-light">Top 10 Books lists</h3>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Author</th>
                            <th>Photo</th>
                            <th>Published Data</th>
                            <th>Publish</th>
                        </tr>
                    </thead>
                    {
                        filteredData?.map((item: {
                            _id: number;
                            title: string;
                            photo: string;
                            author: string;
                            genre: string;
                            published: boolean;
                            publicationDate: string;
                        }, index: number) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.genre}</td>
                                    <td>{item.author}</td>
                                    <td>
                                        <img src={item.photo} alt="book-images"
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} loading='lazy'/>
                                    </td>
                                    <td>{item.publicationDate}</td>
                                    <td>{item.published === true ? "Yes" : "No"}</td>
                                    <td>
                                        <Link to={`/book/single/${item._id}`} className='text-decoration-none'>
                                            <Button>View</Button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }

                </Table>
            </div>
        </div>
    )
}

export default Books