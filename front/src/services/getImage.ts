import React from 'react'

const baseUrl = 'https://0.0.0.0:2000'
const getImage = (url: string) => {
    
  return ( baseUrl + url
  )
}

export default getImage