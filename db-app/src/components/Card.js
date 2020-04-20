import React from 'react'
import {Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const Cards=(props)=> {
  const {title, link, moreInfo,color}= props;
  
    return (
      
        // <Card style={{ marginLeft:'2rem', height: '18rem',width: '18rem', center:'100%' }}>
      <Card>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body style={{marginTop:'30rem',margin:'2rem'}}>
          <Card.Title className="card-title" style={{backgroundColor:color}}>{title}</Card.Title>
          <Card.Text style={{textAlign:'center'}}>
            {moreInfo}
          </Card.Text>
          <Button className="card-button" style={{backgroundColor:color}} as={Link} to={link}> Let's go </Button>
        </Card.Body>
      </Card>
    )
}

export default Cards;
