import Table from 'react-bootstrap/Table';
import { useGetAllPostQuery } from '../redux/api/apiSlice';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Books = () => {
    const { data } = useGetAllPostQuery(undefined)
    return (
        <div className="container mb-4">
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
                        data?.map((item: {
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
                                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
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