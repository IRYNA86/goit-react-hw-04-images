import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '25360661-9d832ca480fd7eb90334f4453';


export const getCoolImages = async (page, nameImages, per_page) => {
  const response = await axios.get(
    `/?key=${API_KEY}&q=${nameImages}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
   return response.data;
};

export default getCoolImages;