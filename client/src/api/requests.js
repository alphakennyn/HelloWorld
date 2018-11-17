import axios from 'axios';

import url from '../../config/url.json';

const getSample = async () => {
  try {
    const response = await axios.get(`${url.api}/test`);  

    return response;
  } catch (err) {
    console.error(err);
  }
}

export default {
  getSample,
}