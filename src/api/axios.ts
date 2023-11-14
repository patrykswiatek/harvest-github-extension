import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_HARVEST_API_URL,
  headers: {
    common: {
      'Harvest-Account-Id': process.env.REACT_APP_HARVEST_ACCOUNT_ID,
      Authorization: `Bearer ${process.env.REACT_APP_HARVEST_TOKEN}`,
      'User-Agent': 'Harvest API Client',
    }
  }
})

export default axiosClient
