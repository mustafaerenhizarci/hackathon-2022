import React from 'react'

function MovieCard({image,className}) {
  return (
    <img src={image} className={className + " rounded-xl"}/>
  )
}

export default MovieCard