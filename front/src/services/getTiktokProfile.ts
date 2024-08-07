const getTiktokProfile = (username: string) => {
    if (!username) return "";
    const prefix = 'https://www.tiktok.com/@';
    return prefix + username;
  };

export default getTiktokProfile