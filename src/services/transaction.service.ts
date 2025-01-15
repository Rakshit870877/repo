import { TransactionDetailsResponse } from '@/types/transaction.type'
import api1 from './apis/api1'
import { BaseService } from './base.service'

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
}
