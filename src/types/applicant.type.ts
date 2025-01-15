export interface ApplicantFormData {
    applicantId: string;
    applicantName: string;
    nationality: string;
    residenceCountry: string;
    phone: string;
    email: string;
    country: string;
    residenceAddress: string;
    residenceCity: string;
    residenceState: string;
    residencePostalCode: string;
    currentPostalCode: string;
    currentCountry: string;
    currentAddress: string;
    currentCity: string;
    currentState: string;
    documentType: string;
    documentPreview: File | null; 
     __v: 0   
  }
  export interface ApplicantResponse {
    success: boolean;
    message: string;
    data: ApplicantFormData; 
  }
  
  