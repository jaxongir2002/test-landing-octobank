import axios from 'axios'

const axiosIns = axios.create({
// You can add your headers here
// ================================
  baseURL: import.meta.env.VITE_APP_API_URL,

  // timeout: 1000,
  headers: { 'Accept-Language': 'ru' },
})


const formatValidationErrors = errors => {
  return Object.values(errors)
    .map((value, i) => `${i + 1}. ${value}`)
    .join('\n')
}

const getValidationErrorsString = response => {
  if (response.data.data instanceof Array) {
    return response.data?.data?.map((err, i) => `${i + 1}. ${err.message}`).join('\n')
  } else {
    return formatValidationErrors(response.data.data)
  }
}

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  return response
}, async error => {
  // Handle error


  return Promise.reject(error)

})
export default axiosIns
