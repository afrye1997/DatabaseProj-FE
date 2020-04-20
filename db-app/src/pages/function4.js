import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Jumbotron, Container, Button, Spinner } from "react-bootstrap";

const Function4 = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://csce4523-application.herokuapp.com/students/getStudent`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setStudents(response);
        setLoading(false);
      })
      .catch((error) => console.log(error));

    return () => {
      console.log("hey");
    };
  }, []);

  return (
    <div>
      <Jumbotron style={{ backgroundColor: "#FFDAC1" }}>
        <h1 style={{ color: "white", textAlign: "center" }}>
          VIEW ALL STUDENTS
        </h1>
      </Jumbotron>
      <Container>
      <>
  <style type="text/css">
    {`
    .table-striped tbody tr:nth-child(odd) {
      background-color:#FFE9DD;
    }
    .table-hover tbody tr:hover{color:white;background-color:#C7CEEA};

    }
    `}
  </style>

        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th>ID </th>
              <th>Name</th>
              <th>Major </th>
            </tr>
          </thead>
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <tbody>
              {students.map((students) => (
                <tr>
                  <td>{students.S_ID}</td>
                  <td>{students.S_NAME}</td>
                  <td>{students.S_MAJOR}</td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
        </>

        <Link to="/">
          <Button
            style={{ marginLeft: "45%", marginBottom: "5%", backgroundColor: "#FFDAC1" }}
            variant="primary"
          >
            Back Home
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Function4;
