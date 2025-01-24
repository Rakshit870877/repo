import { TransactionDetailsResponse } from '@/types/transaction.type'
import api1 from './apis/api1'
import { BaseService } from './base.service'
const { VITE_APP_BACKEND, VITE_APP_URL, VITE_APP_APPLICANT, VITE_APP_TRANSACTION } = import.meta.env

export class TransactionService extends BaseService {
  async gettransactions(): Promise<TransactionDetailsResponse> {
    let url = 'transaction-details'
    try {
      let data = await api1.get(url)
      
      return data
    } catch (e) {
      throw new Error(e as any)
    }
  }
  async createTransaction(payload: any) {
    let url = `${VITE_APP_TRANSACTION}/transaction-outward/create`
    try {
      let { data } = await api1.post(url, payload)
      return data
    } catch (err) {
      console.log(err)
    }
  }
}
