import React from "react";
import './ItemList.css';

function ItemList({loading, onLoading, data, error, filterGenre, filterName, render}){
  return (
    <section className="ItemList">
      {error}
      {loading && React.Children.toArray([...Array(4)].map(onLoading))}

      {(!loading && !error && filterName) &&  data.results.filter((e)=>e.name.toLowerCase().includes(filterName.toLowerCase())).map(render)}
      
      {(!loading && !error && filterGenre && !filterName) &&  data.results.filter((e)=>e.genres.map((g)=>g.name.toLowerCase()).includes(filterGenre.toLowerCase())).map(render)}

      {(!loading && !error && !filterGenre && !filterName) &&  data.results.map(render)}
    
    </section>
  )
}

export { ItemList };