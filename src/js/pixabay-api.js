import axios from "axios";

export async function imageSearch(value, page = 1) {
  const API = '43068097-aa3ed59823608d0655ab40c7d';
  const defaultURL = "https://pixabay.com/api/";

  const params = new URLSearchParams({
    key: API,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  });

  try {
    const response = await axios.get(defaultURL, { params });

    if (response.status !== 200) {
      throw new Error("Error");
    }

    const data = response.data;
    if (data.totalHits === 0) {
      return null;
    }

    return data;
  } catch (error) {
    return error;
  }
}
