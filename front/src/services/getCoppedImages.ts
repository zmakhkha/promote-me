import noImage from '../assets/no-image-placeholder.webp'
import avatar from "../assets/no-image-placeholder.webp";

const getCroppedImageUrl = (url: String) => {
	// if (!url) return noImage;
	// const target = 'media/';
	// const index = url.indexOf(target) + target.length;
	// return url.slice(0, index) + 'crop/600/400/' + url.slice(index);
	return String(url) ;
}

export default getCroppedImageUrl;