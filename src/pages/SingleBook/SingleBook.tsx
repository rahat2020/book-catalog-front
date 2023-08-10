import { useParams } from "react-router-dom"
import Topbar from "../../components/Topbar"
import { useGetSinglePostQuery } from "../../redux/api/apiSlice"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Footer } from "../../components/Footer";

export const SingleBook = () => {
    const { _id } = useParams()
    console.log('id', _id)
    const { data: item } = useGetSinglePostQuery(_id)


    return (
        <div>
            <Topbar />
            <div className="container mt-5 pt-5 mb-4">
                <Card>
                    <Card.Header className="fw-bold text-dark">Author: {item?.author}</Card.Header>
                    <Card.Body>
                        <Card.Title>Name: {item?.title}</Card.Title>
                        <img src={item?.photo} alt="book-image" style={{ width: '80px', height: '80px' }} />
                        <Card.Text>
                            <p>Genre: {item?.genre}</p>
                            <p>Published Data: {item?.publicationDate.slice(0, 10)}</p>
                            <p>Published: {item?.published === true ? "Yes" : "No"}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <div className="reviews mt-4">
                    <h5>Reviews:</h5>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                        <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                        <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
