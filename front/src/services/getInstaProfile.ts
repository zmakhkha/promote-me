import React from 'react'

const getInstaProfile = (username: string) => {
    if (!username) return "";
    const prefix = 'https://www.instagram.com/';
    return prefix + username;
  };

export default getInstaProfile