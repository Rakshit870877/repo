import { ApplicantFormData, ApplicantResponse } from '@/types/applicant.type'
import api1 from './apis/api1'
import { BaseService } from './base.service'
import axios from 'axios'

const {  VITE_APP_APPLICANT } = import.meta.env 

class ApplicantService extends BaseService {
  async submitApplicantForm(payload: ApplicantFormData): Promise<ApplicantResponse> {
    let url = VITE_APP_APPLICANT+'/applicant/create'
    try {
      // let response = await api1.post(url, payload)
      let response =  await axios.post(url,payload)
      
      return response;
    } catch (err) {
      console.log('error in service file', err)
      throw new Error('Unable to submit applicant form. Please try again.')
    }
  }

  async searchByApplicantId(applicantId: string): Promise<ApplicantResponse> {
    // let url = `/api/applicants/${applicantId}`;
    let url = VITE_APP_APPLICANT+`/applicant-all-details/${applicantId}`
    try {
      // let response = await api1.get(url)
      let {data} = await axios.get(url)
      return data
    } catch (err) {
      console.log('Error in service file:', err)
      throw new Error('Unable to fetch applicant by ID. Please try again.')
    }
  }

  async searchByCountryCode(nationality: string): Promise<ApplicantFormData> {
    let url = VITE_APP_APPLICANT+`/applicant-all-details/nationality/${nationality}`
    try {
      let {data} = await axios.get(url)
      return data
    } catch (err) {
      console.log('Error in service file:', err)
      throw new Error('Unable to fetch applicants by country code. Please try again.')
    }
  }

  async searchByApplicantIdAndCountry(applicantId: string, residenceCountry: string): Promise<ApplicantFormData> {
    let url = VITE_APP_APPLICANT+`/api/applicants/search?applicantId=${applicantId}&country=${residenceCountry}`
    try {
      let {data} = await api1.get(url)
      return data
    } catch (err) {
      console.log('Error in service file:', err)
      throw new Error('Unable to fetch applicants by both criteria. Please try again.')
    }
  }
}
export { ApplicantService }
