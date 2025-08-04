import axios from "axios"

export class Services {
  static serverURL = "https://job-portal-backend-kirr.onrender.com/auth"


  static addUser(formData) {
    const dataURL = `${this.serverURL}/register`
    return axios.post(dataURL, formData)
  }

  static loginUser(formData) {
    const dataURL = `${this.serverURL}/login`
    return axios.post(dataURL, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  static async updateUser(formValues, token) {
    const dataURL = `${this.serverURL}/update-user`
    return await axios.put(dataURL, formValues, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static uploadPhoto(formData, token) {
    const dataURL = `${this.serverURL}/upload-profile`
    return axios.put(dataURL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async uploadResume(formData,token){
    const dataURL=`${this.serverURL}/upload-resume`
    return await axios.put(dataURL,formData,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }

  static async getUserProfile(token) {
    const dataURL = `${this.serverURL}/get-userProfile`
    return await axios.get(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}