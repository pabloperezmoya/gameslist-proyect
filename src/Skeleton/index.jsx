import React from "react";
import './Skeleton.css'

function Skeleton(){
  return (
    <div className="ItemContainer--skeleton">
      <div className="Item-skeleton--image"/>
      <div className="ItemsSkeletonContainer">
        <div className="Item-skeleton--title"></div>
        <div className="Item-skeleton"></div>
        <div className="Item-skeleton"></div>
        <div className="Item-skeleton"></div>
      </div>
    </div>
  )
}

export { Skeleton };