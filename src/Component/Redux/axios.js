import axios from 'axios'

const instance = axios.create({
	// baseURL: process.env.REACT_APP_DO_URL   // url для heroku
	// baseURL: 'https://pcref.site:9000',
	baseURL: 'http://localhost:4444',
})

instance.interceptors.request.use(config => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})

export default instance
