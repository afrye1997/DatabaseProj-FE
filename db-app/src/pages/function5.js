import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Jumbotron,
  Form,
  Table,
  Alert,
  Container,
  Button,
  Spinner,
  Row
} from "react-bootstrap";

const Function5 = () => {
  const [C_DEPTCODE, setC_DEPTCODE] = useState("CSCE");
  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [ans, setAns] = useState({
    Message: "",
    Variant: "",
  });

  function addCourse() {
    fetch(
      `https://csce4523-application.herokuapp.com/course/getCourse/givenDepartment?C_DEPTCODE=${C_DEPTCODE}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.length === 0) {
          setAns({
            Message: "That code does not exist. Try again.",
            Variant: "danger",
          });
          setLoading(false);
        } else {
          setAns({
            Message: "That code does not exist. Try again.",
            Variant: "success",
          });
          setCourses(response);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <Jumbotron style={{ backgroundColor: "#FFB7B2" }}>
        <h1 style={{ color: "white", textAlign: "center" }}>
          VIEW ALL COURSES FROM A GIVEN DEPT
        </h1>
      </Jumbotron>

      <Container>
        <Form
          method="GET"
          style={{
            marginLeft: "25%",
            width: "60%",
            border: "3px",
            paddingTop: "3%",
          }}
          className="inline"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            addCourse();
          }}
        >
          <Form.Group as={Row}>
            <Form.Label className="form-labelbody">Course Dept Code</Form.Label>
            <Form.Control
              name="C_DEPTCODE"
              required
              type="text"
              value={C_DEPTCODE}
              placeholder="Enter 4 letter code"
              onChange={(e) => setC_DEPTCODE(e.target.value)}
              style={{ width: "20%", borderTop: "none" }}
            />
            <Button
              style={{ marginLeft: "5%", height: "38px", backgroundColor:"#FFB7B2" }}
              variant="primary"
              type="submit"
            >
              {" "}
              {isLoading ? "Loading…" : "Submit!"}
            </Button>
          </Form.Group>
        </Form>
      </Container>

      {ans.Variant === "danger" ? (
        <Alert
          style={{
            width: "20%",
            height: "100px",
            marginLeft: "40%",
            marginTop: "1%",
          }}
          variant={ans.Variant}
        >
          <p style={{ textAlign: "center", paddingTop: "1rem" }}>
            {ans.Message}
          </p>
        </Alert>
      ) : (
        <>
          <style type="text/css">
            {`
    .table thead th,tbody td{
      width: 10%;
      text-align:center;
      text-emphasis:bold;
    }
    .table {
      width: 80%;
      margin-left:10%;
      margin-bottom: 1rem;
      color: #212529;
      }

      .table-striped tbody tr:nth-child(odd) {
        background-color:#FFE9DD;
      }
      .table-hover tbody tr:hover{color:white;background-color:#C7CEEA};
    `}
          </style>
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th>Dept. Code </th>
                <th>Course Num</th>
                <th>Title </th>
                <th>Credit Hours </th>
              </tr>
            </thead>
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <tbody>
                {courses.map((course) => (
                  <tr>
                    <td>{course.C_DEPTCODE}</td>
                    <td>{course.C_COURSENUM}</td>
                    <td>{course.C_TITLE}</td>
                    <td>{course.C_CREDITHOURS}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </>
      )}

      <Link to="/">
        <Button
          style={{ marginTop: "5%", marginLeft: "46%" , backgroundColor:"#FFB7B2"}}
          variant="primary"
        >
          Back Home
        </Button>
      </Link>
    </div>
  );
};

export default Function5;
