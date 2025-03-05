import { TransactionDetailsResponse } from '@/types/transaction.type'
import api1 from './apis/api1'
import { BaseService } from './base.service'
const { VITE_APP_BACKEND, VITE_APP_URL, VITE_APP_APPLICANT, VITE_APP_TRANSACTION,VITE_FOREX_APP_CREDENTIALS } = import.meta.env

export class TransactionService extends BaseService {
  async gettransactions(): Promise<TransactionDetailsResponse> {
    let url = '/api/transactions/transaction-details'
    try {

    let data= await fetch("https://055f-49-36-189-96.ngrok-free.app/api/transactions/transaction-details", {
        method: "GET",
        headers: {

            'ngrok-skip-browser-warning':"9188",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });


      // let data = await api1.get(url)
      
      return data as any
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

  async createPayfastTransaction(transaction: any,amount:any) {
    let url = `${VITE_APP_TRANSACTION}/transaction-outward/ozow?amount=${amount}&transactionId=${transaction}`
    try {
      let  data  = await api1.get(url)    
      
      console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  }

async createRecons(payload:any){
let url=`${VITE_APP_TRANSACTION}/api/recon-transactions/create`
try{
let data=await api1.post(url,payload)
return data
}
catch(err){

  console.log(err)
}

}


async getForexRate(country:any){

  let url=`https://data.fixer.io/api/latest?access_key=${VITE_FOREX_APP_CREDENTIALS}&base=ZAR&symbols=${country}`
  
  try{
  let data=await api1.get(url)

  return data.rates[country]
  }
  catch(err){
  
    console.log(err)
  }
  
  }


}
