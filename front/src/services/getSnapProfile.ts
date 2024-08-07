
const getSnapProfile = (username: string) => {
	if (!username) return "";
	const prefix = 'https://www.snapchat.com/add/';
	return prefix + username;
  };

export default getSnapProfile;