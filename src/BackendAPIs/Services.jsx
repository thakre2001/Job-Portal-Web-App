import axios from "axios"

export class Services {
  // static serverURL = "https://job-portal-backend-kirr.onrender.com/auth"
  static serverURL = "http://localhost:8093"


  // User APIs

  static addUser(sendData) {
    const dataURL = `${this.serverURL}/auth/register`
    return axios.post(dataURL, sendData)
  }

  static loginUser(formData) {
    const dataURL = `${this.serverURL}/auth/login`
    return axios.post(dataURL, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  static async updateUser(basicValues, token) {
    const dataURL = `${this.serverURL}/user/update-user`
    return await axios.put(dataURL, basicValues, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static uploadPhoto(formData, token) {
    const dataURL = `${this.serverURL}/user/upload-profile`
    return axios.put(dataURL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async uploadResume(formData, token) {
    const dataURL = `${this.serverURL}/user/upload-resume`
    return await axios.put(dataURL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async getUserProfile(token) {
    const dataURL = `${this.serverURL}/user/get-userProfile`
    return await axios.get(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Experience APIs

  static async addExperience(form, token) {
    const dataURL = `${this.serverURL}/experience/add`
    return axios.post(dataURL, form, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async updateExperience(editingExpId, form, token) {
    const dataURL = `${this.serverURL}/experience/update/${editingExpId}`
    return axios.put(dataURL, form, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  static async deleteExperience(id, token) {
    const dataURL = `${this.serverURL}/experience/delete/${id}`
    return axios.delete(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Education APIs

  static async addEducation(form, token) {
    const dataURL = `${this.serverURL}/education/add`
    return await axios.post(dataURL, form, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async updateEducation(educationId, form, token) {
    const dataURL = `${this.serverURL}/education/update/${educationId}`
    return await axios.put(dataURL, form, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  static async deleteEducation(id, token) {
    const dataURL = `${this.serverURL}/education/delete/${id}`
    return await axios.delete(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Skills APIs for Normal User

  static async getAllSkills() {
    // const dataURL = `${this.serverURL}/skills/get`
    return await axios.get('http://localhost:8093/skills/get')
  }

  static async addSkill(skillId, token) {
    const dataURL = `${this.serverURL}/skills/addSkill/${skillId}`
    return await axios.post(dataURL, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async removeSkill(skillId, token) {
    const dataURL = `${this.serverURL}/skills/removeSkill/${skillId}`;
    return await axios.delete(dataURL, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Recruiter APIs

  static async recruiterRegistration(formData) {
    const dataURL = `${this.serverURL}/recruiter/add`
    return await axios.post(dataURL, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  static async updateRecruiter(formData, token) {
    const dataURL = `${this.serverURL}/recruiter/update`
    return await axios.put(dataURL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Job APIs

  static async addJob(formData, token) {
    const dataURL = `${this.serverURL}/jobs/create`
    return axios.post(dataURL, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  static async getJobById(jobId) {
    const dataURL = `${this.serverURL}/jobs/${jobId}`
    return await axios.get(dataURL)
  }

  static async getAllJobs() {
    const dataURL = `${this.serverURL}/jobs/all`
    return await axios.get(dataURL)
  }

  static async getAllJobForUser(token) {
    const dataURL = `${this.serverURL}/jobs/allJobs/user`
    return await axios.get(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async getRecruiterJobs(token) {
    const dataURL = `${this.serverURL}/jobs/recruiter/my-jobs`
    return await axios.get(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async deleteJob(jobToDelete, token) {
    const dataURL = `${this.serverURL}/jobs/${jobToDelete}`
    return await axios.delete(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async changeJobStatus(jobId, token, status) {
    const dataURL = `${this.serverURL}/jobs/${jobId}/status`
    return await axios.put(dataURL, {}, {
      params: { status },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // Saved Jobs APIs

  static async saveJobToUser(jobId, token) {
    const dataURL = `${this.serverURL}/savedjobs/add/${jobId}`
    return await axios.post(dataURL, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async deleteSavedJobFromUser(jobId,token){
    const dataURL = `${this.serverURL}/savedjobs/delete/${jobId}`
     return await axios.delete(dataURL,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async fetchSavedJobByUser(token) {
    const dataURL = `${this.serverURL}/savedjobs/getAll`
    return await axios.get(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  // company APIs

  static async getAllCompanies() {
    const dataURL = `${this.serverURL}/company/all`
    return await axios.get(dataURL)
  }

  // Job Application APIs

  static async applyToJob(jobId, formDataObj, token) {
    const dataURL = `${this.serverURL}/job-application/apply-job/${jobId}`
    return await axios.post(dataURL, formDataObj, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async fetchApplicantAppliedJob(token) {
    const dataURL = `${this.serverURL}/job-application/application`
    return await axios.get(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async updateApplicationStatus(appId, status, token) {
    const dataURL = `${this.serverURL}/job-application/status/${appId}`
    return await axios.put(dataURL, {
      status: status
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

  }

  static async getApplicationsByJob(jobId, token) {
    const dataURL = `${this.serverURL}/job-application/recruiter-jobApplications/${jobId}`
    return await axios.get(dataURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }


}