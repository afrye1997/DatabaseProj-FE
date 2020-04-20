import React from 'react';
import {Row, Container, Col} from 'react-bootstrap';
import Card from './Card';
export const Home =()=>{
    return (
    <Container>
        <Row style={{marginTop:'5%', marginBottom:'5%' }}>
            <Col sm>
                <Card
                    color="#C7CEEA" 
                    title="FUNCTION 1"
                    link="/function1" 
                    moreInfo="Add a student to the Student table"/>
                   
            </Col>
            <Col sm>
                <Card
                    color="#B5EAD7"
                    title="FUNCTION 2" 
                    link="/function2"
                    moreInfo="Add a course to the Course table" />
            </Col>
            <Col sm>
                <Card 
                    color="#C6D2B2"
                    title="FUNCTION 3" 
                    link="/function3" 
                    moreInfo="Add an application to the Enrollment table"/>
            </Col>
        </Row>

        <Row style={{marginBottom:'5%'}}>
        <Col>
                <Card 
                    color="#FFAD77"
                    title="FUNCTION 4" 
                    link="/function4" 
                    moreInfo="View all students"/>
            </Col>
            <Col>
                <Card 
                    color="#FFB7B2"
                    title="FUNCTION 5" 
                    link="/function5"
                    moreInfo="View all courses from a given department" />
            </Col>
            <Col>
                <Card 
                    color="#FF9AA2"
                    title="FUNCTION 6" 
                    link="/function6"
                    moreInfo="View all courses for a given student"/>
            </Col>

        </Row>
    </Container>
    )
    }

    export default Home;