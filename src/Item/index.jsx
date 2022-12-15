import React from "react";
import './Item.css'

function Item({name, image, rating, released, genres}){
  return (
    <div className="ItemContainer">
      <img src={image} alt={name} className="Item-image"/>
      <div className="ItemContent">
        <h3 className="Item-h3">{name}</h3>
        <li className="Item-p--rating">Rating: {rating}</li>
        <li className="Item-p--released">Released: {released}</li>
        <div className="Item-p--genres">
          
          {React.Children.toArray(genres.map((g)=><li>{g.name}</li>))}
          
        </div>
      </div>
    </div>
  )
}

export { Item };