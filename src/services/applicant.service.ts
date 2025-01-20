import { ApplicantData, ApplicantFormData, ApplicantResponse, KYCData } from '@/types/applicant.type'
import api1 from './apis/api1'
import { BaseService } from './base.service'
import axios from 'axios'
// const { VITE_APP_BACKEND, VITE_APP_URL } = import.meta.env
const { VITE_APP_BACKEND, VITE_APP_URL, VITE_APP_APPLICANT, VITE_APP_KYC } = import.meta.env

class ApplicantService extends BaseService {
  async submitApplicantForm(payload: ApplicantFormData): Promise<ApplicantResponse> {
    let url = '/applicants'
    try {
      let { data } = await axios.get(url)

      // let response = await api1.post(url, payload)
      //@ts-ignore
      return data
    } catch (err) {
      console.log('error in service file', err)
      throw new Error('Unable to submit applicant form. Please try again.')
    }
  }

  async getApplicantDetalis(): Promise<Array<ApplicantData>> {
    let url = `${VITE_APP_APPLICANT}/applicant-all-details`
    try {
      let { data } = await axios.get(url)
      // let response = await api1.post(url, payload)
      //@ts-ignore
      return data
    } catch (err) {
      console.log('error in service file', err)
      throw new Error('Unable to submit applicant form. Please try again.')
    }
  }

  async getApplicantKyc(): Promise<Array<KYCData>> {
    let url = `${VITE_APP_KYC}/api/kyc`
    try {
      let { data } = await axios.get(url)
      // let response = await api1.post(url, payload)
      //@ts-ignore
      return data
    } catch (err) {
      console.log('error in service file', err)
      throw new Error('Unable to submit applicant form. Please try again.')
    }
  }

  async searchByApplicantId(applicantId: string): Promise<ApplicantResponse> {
    // let url = `/api/applicants/${applicantId}`;
    let url = `/applicant-all-details/${applicantId}`
    try {
      let response = await api1.get(url)
      console.log(response)
      return response
    } catch (err) {
      console.log('Error in service file:', err)
      throw new Error('Unable to fetch applicant by ID. Please try again.')
    }
  }

  async searchByCountryCode(residenceCountry: string): Promise<ApplicantFormData> {
    let url = `/api/applicants/country/${residenceCountry}`
    try {
      let response = await api1.get(url)
      return response
    } catch (err) {
      console.log('Error in service file:', err)
      throw new Error('Unable to fetch applicants by country code. Please try again.')
    }
  }

  async searchByApplicantIdAndCountry(applicantId: string, residenceCountry: string): Promise<ApplicantFormData> {
    let url = `/api/applicants/search?applicantId=${applicantId}&country=${residenceCountry}`
    try {
      let response = await api1.get(url)
      return response
    } catch (err) {
      console.log('Error in service file:', err)
      throw new Error('Unable to fetch applicants by both criteria. Please try again.')
    }
  }
}
export { ApplicantService }
