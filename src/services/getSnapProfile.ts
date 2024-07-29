
const getSnapProfile = (username: String) => {
	if (!username) return "";
	const prefix = 'https://www.snapchat.com/add/';
    const url = prefix + username
	// const index = url.indexOf(target) + target.length;
	// return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
	return url;
}

export default getSnapProfile;