export interface TransactionDetailsResponse {
  message: string
  status: boolean
  transactionDetailsList: TransactionDetail[]
}
export interface TransactionDetail {
  transactionOutward: TransactionOutward
  transactionInward: TransactionInward
  beneficiary: Beneficiary
}

export interface TransactionOutward {
  transactionNumber: string
  sendCountry: string
  receiveCountry: string
  applicantId: string
  receiverId: string
  dealCoverNumber: string
  exchangeRates: number
  principalCurrency: string
  principalAmount: number
  settlementCurrency: string
  settlementAmount: number
  charges: number
  lcharges2: number
  destinationBankBicCode: string
  transactionStatus: string
  reportingStatus: string
}

export interface TransactionInward {
  transactionNumberIw: string
  owTransactionNumber: string
  sendingCountry: string
  receivingCountry: string
  settlementCurrency: string
  settlementAmount: number
  reportingStatus: string
  destinationBankCode: string
}

export interface TransactionInwardCalclulated {
  transactionNumberIw: string
  owTransactionNumber: string
  sendingCountry: string
  receivingCountry: string
  settlementCurrency: string
  settlementAmount: number
  reportingStatus: string
  destinationBankCode: string
  beneficiaryId: string
  residenceCountry: string
  nationality: string
  beneficiaryName: string
  idType: string
  idNumber: string
  physicalAddressLine1: string
  physicalAddressLine2: string
  physicalAddressLine3: string
  suburb: string
  city: string
  postCode: string
  country: string
  bankName: string
  bankBicCode: string
  sortCode: string
  iban: string
  profileStatus: boolean
  sanctionStatus: boolean
  fraudStatus: boolean
  applicant: string
  activeStatus: boolean
}
export interface TansactionOutwardCalculated {
  transactionNumber: string
  sendCountry: string
  receiveCountry: string
  applicantId: string
  receiverId: string
  dealCoverNumber: string
  exchangeRates: number
  principalCurrency: string
  principalAmount: number
  settlementCurrency: string
  settlementAmount: number
  charges: number
  lcharges2: number
  destinationBankBicCode: string
  transactionStatus: string
  reportingStatus: string
  beneficiaryId: string
  residenceCountry: string
  nationality: string
  beneficiaryName: string
  idType: string
  idNumber: string
  physicalAddressLine1: string
  physicalAddressLine2: string
  physicalAddressLine3: string
  suburb: string
  city: string
  postCode: string
  country: string
  bankName: string
  bankBicCode: string
  sortCode: string
  iban: string
  profileStatus: boolean
  sanctionStatus: boolean
  fraudStatus: boolean
  applicant: string
  activeStatus: boolean
}
export interface Beneficiary {
  beneficiaryId: string
  residenceCountry: string
  nationality: string
  beneficiaryName: string
  idType: string
  idNumber: string
  physicalAddressLine1: string
  physicalAddressLine2: string
  physicalAddressLine3: string
  suburb: string
  city: string
  postCode: string
  country: string
  bankName: string
  bankBicCode: string
  sortCode: string
  iban: string
  profileStatus: boolean
  sanctionStatus: boolean
  fraudStatus: boolean
  applicant: string
  activeStatus: boolean
}
