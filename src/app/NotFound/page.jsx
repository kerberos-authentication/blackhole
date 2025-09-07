import React from 'react'
import notFound from '/404DogWaitingForFood.PNG'
const NotFound = () => {
  return (
    <div>
      <img src={notFound} width={100} heght={100} alt="The page you requested is not found! sorry" />
    </div>
  )
}

export default NotFound
