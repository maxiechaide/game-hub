import axios from "axios";

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '53136d5fc9c3436184fb81aa1167f965',
  },
});