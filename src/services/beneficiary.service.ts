import { BeneficiaryFormData, BeneficiaryResponse } from "@/types/beneficiary.type";
import api1 from "./apis/api1";
import { BaseService } from "./base.service";

class BeneficiaryService extends BaseService {
        async submitBeneficiaryForm(payload: BeneficiaryFormData): Promise<BeneficiaryResponse> {
            let url = '/beneficiary'; 
            try {
            let { data } = await api1.post(url, payload); 
            return data; 
            } catch (err) {
                console.log("error in service file", err)
            throw new Error("Unable to submit beneficiary form. Please try again.");
            }
        }

        async getApplicantDetailsById(applicantId: string): Promise<BeneficiaryResponse> {
            let url = `/applicant/${applicantId}`;  
            try {
              const { data } = await api1.get(url); 
              return data;  
            } catch (err) {
              console.error('Error fetching  data:', err);
              throw new Error('Unable to fetch applicant data. Please try again.');
            }
          }
}
  export {BeneficiaryService}



 