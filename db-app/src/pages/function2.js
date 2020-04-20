import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Form, Button, Container, Jumbotron } from "react-bootstrap";

const Function2 = () => {
  const [ans, setAns] = useState({
    Message: "",
    Variant: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({
    C_DEPTCODE: null,
    C_COURSENUM: null,
    C_TITLE: null,
    C_CREDITHOURS: null,
  });

  function addCourse() {
    fetch(
      `https://csce4523-application.herokuapp.com/course/addCourse?C_DEPTCODE=${form.C_DEPTCODE}&C_COURSENUM=${form.C_COURSENUM}&C_TITLE=${form.C_TITLE}&C_CREDITHOURS=${form.C_CREDITHOURS}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((response) => {
        console.log(response);
        console.log(
          form.C_DEPTCODE,
          form.C_COURSENUM,
          form.C_TITLE,
          form.C_CREDITHOURS
        );
        setLoading(false);
        if (response.includes("Course added successfully!"))
          setAns({ Message: response, Variant: "success" });
        else
          setAns({ Message: "This course already exists!", Variant: "danger" });
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
      <Jumbotron style={{ backgroundColor: "#B5EAD7" }}>
        <h1 style={{ color: "white", textAlign: "center" }}>
          ADD A COURSE TO THE COURSE TABLE
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
            addCourse();
          }}
        >
          <Form.Group>
            <Form.Label>Dept Code</Form.Label>
            <Form.Control
              name="C_DEPTCODE"
              required
              type="text"
              value={form.C_DEPTCODE}
              placeholder="Enter 4 letter dept code"
              onChange={updateField}
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Course Num</Form.Label>
            <Form.Control
              value={form.C_COURSENUM}
              placeholder="Enter course number"
              type="number"
              name="C_COURSENUM"
              required
              onChange={updateField}
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Course Title</Form.Label>
            <Form.Control
              value={form.C_TITLE}
              onChange={updateField}
              placeholder="Enter your course title"
              type="text"
              name="C_TITLE"
              required
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Credit Hours</Form.Label>
            <Form.Control
              value={form.C_CREDITHOURS}
              onChange={updateField}
              placeholder="Enter number of credit hours"
              type="number"
              name="C_CREDITHOURS"
              required
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>

          <Button
            style={{
              marginLeft: "5%",
              width: "109px",
              backgroundColor: "#B5EAD7",
            }}
            variant="primary"
            type="submit"
          >
            {" "}
            {isLoading ? "Loading…" : "Submit!"}
          </Button>
          <Link to="/">
            <Button
              style={{ marginLeft: "7%", backgroundColor: "#B5EAD7" }}
              variant="primary"
            >
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

export default Function2;
