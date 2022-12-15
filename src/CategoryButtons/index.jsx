import React from "react";
import './CategoryButtons.css';

function CategoryButtons({genres, toggleFilterGenre, styleFn}){
  return (
    <div className="categoriesContainer">
      {React.Children.toArray(
        genres.map((g)=><button className="categoryButton" style={styleFn(g)} onClick={()=>toggleFilterGenre(g)}>{g}</button>))}
    </div>
  )
}

export { CategoryButtons };