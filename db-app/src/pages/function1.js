import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Form,
  Button,
  Container,
  Jumbotron,
} from "react-bootstrap";

const Function1 = () => {
  const [ans, setAns] = useState({
    Message: "",
    Variant: "",
  });
  const [isLoading, setLoading] = useState(false);

  const [form, setForm] = useState({
    S_ID: null,
    S_NAME: null,
    S_MAJOR: null,
  });

  function addStudent() {
    fetch(
    `https://csce4523-application.herokuapp.com/students/addStudent?S_ID=${form.S_ID}&S_NAME=${form.S_NAME}&S_MAJOR=${form.S_MAJOR}`,
     // `http://localhost:4000/students/addStudent?S_ID=${form.S_ID}&S_NAME=${form.S_NAME}&S_MAJOR=${form.S_MAJOR}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.text())
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.includes("Successfully added!"))
          setAns({ Message: response, Variant: "success" });
        else
          setAns({ Message: "This user already exists!", Variant: "danger" });
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
      <Jumbotron style={{ backgroundColor: "#C7CEEA" }}>
        <h1 style={{ color: "white", textAlign: "center" }}>
          ADD A STUDENT TO THE STUDENT TABLE
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
            addStudent();
          }}
        >
          <Form.Group>
            <Form.Label>School ID</Form.Label>
            <Form.Control
              name="S_ID"
              required
              type="number"
              value={form.S_ID}
              placeholder="Enter 9 digit ID"
              onChange={updateField}
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={form.S_NAME}
              onChange={updateField}
              placeholder="Enter student name"
              type="text"
              name="S_NAME"
              required
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Major Code</Form.Label>
            <Form.Control
              value={form.S_MAJOR}
              onChange={updateField}
              placeholder="Enter major code"
              type="text"
              name="S_MAJOR"
              required
              style={{ width: "50%", borderRight: "none", borderTop: "none" }}
            />
          </Form.Group>
          <Button
            style={{ marginLeft: "5%", width: "109px", background:"#C7CEEA" }}
            variant="primary"
            type="submit"
          >
            {" "}
            {isLoading ? "Loading…" : "Submit!"}
          </Button>
          <Link to="/">
            <Button style={{ marginLeft: "7%", background:"#C7CEEA"}} variant="primary">
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

export default Function1;
