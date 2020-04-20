import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Form,
  Button,
  Container,
  Jumbotron,
} from "react-bootstrap";

const Function3 = () => {
  const [ans, setAns] = useState({
    Message: "",
    Variant: "",
  });
  const [isLoading, setLoading] = useState(false);

  const [form, setForm] = useState({
    ENROLLMENT_ID: null,
    STUDENT_ID: null,
    COURSE_DEPTCODE: null,
    COURSE_COURSENUM: null,
  });
  
  function addApplication() {
    fetch(
     // `http://localhost:4000/enrollment/addEnrollment/?ENROLLMENT_ID=${form.ENROLLMENT_ID}&STUDENT_ID=${form.STUDENT_ID}&COURSE_DEPTCODE=${form.COURSE_DEPTCODE}&COURSE_COURSENUM=${form.COURSE_COURSENUM}`,
      `https://csce4523-application.herokuapp.com/enrollment/addEnrollment?ENROLLMENT_ID=${form.ENROLLMENT_ID}&STUDENT_ID=${form.STUDENT_ID}&COURSE_DEPTCODE=${form.COURSE_DEPTCODE}&COURSE_COURSENUM=${form.COURSE_COURSENUM}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((response) => {
        console.log(response);
        setLoading(false);
        if (response.includes("Applicant was added successfully!"))
          setAns({ Message: response, Variant: "success" });
        else
          setAns({ Message: response, Variant: "danger" });
      })
      .catch((error) => console.log(error));
  }

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Jumbotron style={{ backgroundColor: "#C6D2B2" }}>
        <h1 style={{ color: "white", textAlign: "center" }}>
          ADD AN APPLICATION TO THE ENROLLMENT TABLE
        </h1>
      </Jumbotron>
      <Container>
        <Form
          method="GET"
          style={{
            marginLeft: "35%",
            width: "60%",
            border: "3px",
            paddingTop: "3%",
          }}
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            addApplication();
          }}
        >
          <Form.Group>
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              name="STUDENT_ID"
              required
              type="number"
              value={form.STUDENT_ID}
              placeholder="Enter 9 digit student id"
              onChange={updateField}
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Dept Code</Form.Label>
            <Form.Control
              name="COURSE_DEPTCODE"
              required
              type="text"
              value={form.COURSE_DEPTCODE}
              placeholder="Enter 4-letter course dept"
              onChange={updateField}
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Course Num</Form.Label>
            <Form.Control
              name="COURSE_COURSENUM"
              required
              type="number"
              value={form.COURSE_COURSENUM}
              placeholder="Enter 4 digit course num"
              onChange={updateField}
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>
          <Button
            style={{ marginLeft: "5%", width: "109px", backgroundColor: "#C6D2B2"}}
            variant="primary"
            type="submit"
          >
            {" "}
            {isLoading ? "Loading…" : "Submit!"}
          </Button>
          <Link to="/">
            <Button style={{ marginLeft: "7%" , backgroundColor: "#C6D2B2"}} variant="primary">
              Back Home
            </Button>
          </Link>
        </Form>
      </Container>
      <Alert
        style={{
          width: "20%",
          height: "100px",
          marginLeft: "40%",
          marginTop: "1%",
        }}
        variant={ans.Variant}
      >
        <p style={{ textAlign: "center", paddingTop: "1rem" }}>{ans.Message}</p>
      </Alert>
    </div>
  );
};

export default Function3;
