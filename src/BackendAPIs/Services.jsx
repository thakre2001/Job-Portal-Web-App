import axios from "axios"

export class Services{
    static serverURL="http://localhost:8093"


    static addUser(formData){
        const dataURL=`${this.serverURL}/auth/register`
        return axios.post(dataURL,formData)
    }

    static loginUser(formData){
        const dataURL=`${this.serverURL}/auth/login`
        return axios.post("http://localhost:8093/auth/login", formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });
    }
}