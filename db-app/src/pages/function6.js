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

const Function6 = () => {
  const [STUDENT_ID, setSTUDENT_ID] = useState(123456789);
  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [ans, setAns] = useState({
    Message: "",
    Variant: "",
  });

  function addCourse() {
    fetch(
      `https://csce4523-application.herokuapp.com/course/getCourse/givenStudents?STUDENT_ID=${STUDENT_ID}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.length === 0) {
          setAns({
            Message: "That ID does not exist. Try again.",
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
      <Jumbotron style={{ backgroundColor: "#FF9AA2" }}>
        <h1 style={{ color: "white", textAlign: "center" }}>
          VIEW ALL COURSES FOR A GIVEN STUDENT
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
            <Form.Label className="form-labelbody">Student ID</Form.Label>
            <Form.Control
              name="STUDENT_ID"
              required
              type="number"
              value={STUDENT_ID}
              placeholder="Enter 9 digit ID"
              onChange={(e) => setSTUDENT_ID(e.target.value)}
              style={{ width: "20%", borderTop: "none" }}
            />
            <Button
              style={{ marginLeft: "5%", height: "38px" , backgroundColor:"#FF9AA2"}}
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
        background-color:#FFC3CB;
      }
      .table-hover tbody tr:hover{color:white;background-color:#C7CEEA};
    `}
          </style>
          <Table className="table-hover table-striped">
            <thead>
              <tr>
                <th>Dept. Code</th>
                <th>Course Num</th>
                <th>Title </th>
                <th>Credit Hours</th>
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

      {/* {courses.map((course, index) => (
     <div key={index}>
        <p>{course.C_DEPTCODE} {course.C_COURSENUM}  {course.C_TITLE} {course.C_CREDITHOURS}</p>
    </div>
      ))} */}

      <Link to="/">
        <Button
          style={{ marginTop: "5%", marginLeft: "46%", backgroundColor:"#FF9AA2" }}
          variant="primary"
        >
          Back Home
        </Button>
      </Link>
    </div>
  );
};

export default Function6;
