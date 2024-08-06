import React from 'react'

const baseUrl = 'http://localhost:2000'
const getImage = (url: string) => {
    
  return ( baseUrl + url
  )
}

export default getImage