import { Footer } from "../../components/Footer";
import Topbar from "../../components/Topbar"
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useGetAllPostQuery, useGetSinglePostQuery } from "../../redux/api/apiSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

// const Pddata = [
//   {
//     id: 1,
//     title: 'In Search of Lost Time by Marcel Proust',
//     photo: 'https://d3i5mgdwi2ze58.cloudfront.net/7hqv6ddaqv363p4hadx6lymotow1',
//     genre: 'romantic',
//     publishDate: '12-12-2015',
//     author: 'kazi Asad'
//   },
//   {
//     id: 2,
//     title: 'Ulysses by James Joyce',
//     photo: 'https://d3i5mgdwi2ze58.cloudfront.net/f7nkbyqfsnrrlct3hs01jkrz2vdi',
//     genre: 'romantic',
//     publishDate: '12-12-2015',
//     author: 'Harry kanes'
//   },
//   {
//     id: 3,
//     title: 'Don Quixote by Miguel de Cervantes',
//     photo: 'https://d3i5mgdwi2ze58.cloudfront.net/gvx0r9lfgd8w3mm2ef7vssyi2aaz',
//     genre: 'romantic',
//     publishDate: '12-12-2015',
//     author: 'Nilima rai'
//   },
//   {
//     id: 4,
//     title: 'The Great Gatsby by F. Scott Fitzgerald',
//     photo: 'https://d3i5mgdwi2ze58.cloudfront.net/4hkku1sl8y3fh8ggaazav5o65uqp',
//     genre: 'romantic',
//     publishDate: '12-12-2015',
//     author: 'DL Rai'
//   },
// ]

const AllBooks = () => {

  const { data } = useGetAllPostQuery(undefined)



  console.log(data)

  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = data?.filter((item: { title: string, author: string, genre: string }) =>
    item?.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item?.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filteredData)

  const [filteredBook, setFiltered] = useState('')

  const handleSubmit = () => {
    console.log('submitted')
  }
  
  return (
    <div>
      <Topbar />
      <div className="mt-5 pt-5  p-1 h-100 sm-p-0">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <div className="w-50">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="search genre name"
                  className="me-2 shadow-sm border-1 border-top"
                  aria-label="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                {/* <Button variant="outline-success fw-bold">Search</Button> */}
              </Form>
            </div>
          </div>

        </div>
      </div>
      <div className="container mt-5 pt-5 mb-5">
        <div className="d-flex justify-content-end align-items-center">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <Form.Select aria-label="Default select example" className="w-25" onChange={(e)=>setFiltered(e.target.value)}>
              <option>Open this to select genre</option>
              <option value="Horror">Horror</option>
              <option value="Romantic">Romantic</option>
              <option value="Action">Action</option>
              <option value="Fiction">Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Novel">Novel</option>
            </Form.Select>
            <Button variant="outline-success fw-bold" onClick={handleSubmit}>Filter</Button>
          </div>
        </div>
        <Row className="">
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
              <Col md={4} key={index} className="my-3">
                <Link to={`/book/single/${item._id}`} className="text-decoration-none">
                  <Card style={{ height: '27.75rem' }} className="border-0 shadow-sm rounded">
                    <div className="d-flex">
                      <Card.Img variant="top" src={item.photo} style={{ height: '18.75rem', objectFit: 'contain' }} />
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold text-muted">{item.title}</Card.Title>
                      <Card.Title className="text-muted">Author: {item.author}</Card.Title>
                      <div className="d-flex justify-content-between">
                        <Card.Text className="fw-bold text-secondary">Genre: {item.genre}</Card.Text>
                        <Card.Text className="fw-bold text-secondary">Published: {item.publicationDate.slice(0, 10)}</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          }
        </Row>
      </div>
      <Footer />
    </div>
  )
}

export default AllBooks