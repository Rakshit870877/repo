import { ApplicantData } from '@/types/applicant.type'
import { BaseService } from './base.service'
import axios from 'axios'
const { VITE_APP_BACKEND, VITE_APP_URL } = import.meta.env
// import {Vite_ap}

export class ApplicantService extends BaseService {
  public async getApplicant(): Promise<Array<ApplicantData>> {
    let url = '/applicant-all-details'
    try {
      const response = await axios.get<ApplicantData>(url, {
        headers: {
          'Content-Type': 'application/json', // Adjust the headers as needed
          Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Add token if required
        },
      })

      // The response data is typed as ApplicantData
      const applicantData: ApplicantData = response.data
    } catch (err) {
      console.log(err)
    }
  }
}
