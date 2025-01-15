import { ApplicantFormData, ApplicantResponse } from '@/types/applicant.type'
import api1 from './apis/api1'
import { BaseService } from './base.service'

class ApplicantService extends BaseService {
  async submitApplicantForm(payload: ApplicantFormData): Promise<ApplicantResponse> {
    let url = '/applicants'
    try {
      let response = await api1.post(url, payload)
      //@ts-ignore
      return response
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
