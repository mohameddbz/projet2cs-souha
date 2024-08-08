import React from 'react'

function Card (props){
  return (
    <div className="cardContent">
        <div className="CardTitle">{props.titre}</div>
        <div className="cardDescription">{props.description}</div>
    </div>
  )
}

export default Card
/**
 * cardTitle = name
 * des = cardDescription
 */