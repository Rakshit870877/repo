export interface BeneficiaryFormData {
    applicantId: string;
    beneficiaryName: string;
    nationality: string;
    residentCountry: string;
    phone: string;
    email: string;
    idType: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    accountHolder: string;
    accountNumber: string;
    bankName: string;
    bankCode: string;
   
  }
  
  export interface BeneficiaryFormErrors {
    applicantId?: string;
    beneficiaryName?: string;
    nationality?: string;
    residentCountry?: string;
    phone?: string;
    email?: string;
    idType?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    accountHolder?: string;
    accountNumber?: string;
    bankName?: string;
    bankCode?: string;
    
  }
  
  export interface AddBeneficiaryProps {
    // You can pass additional props here if needed
  }
  
  export interface BeneficiaryResponse {
    success:boolean;
    formData: BeneficiaryFormData;
    formErrors: BeneficiaryFormErrors;
    isSubmitting: boolean;
  }
  