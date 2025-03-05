import axios from "axios";
import api1 from "./apis/api1";
import { BaseService } from "./base.service";
const { VITE_APP_BACKEND, VITE_APP_URL, VITE_APP_APPLICANT, VITE_APP_KYC,VITE_APP_STATIC } = import.meta.env

export class KycService extends BaseService{

async verifyDocument(doccode:string,kycid:string){

let url=`${VITE_APP_KYC}/api/kyc/documents/${kycid}/${doccode}/verify`
    try{
        let payload= {
            "kycId": kycid,               // KYC ID for this document
            "documentCode": doccode  // Document Code
              }
// let {data}=await axios.post(url,payload)

const { data } = await axios.post(url, payload);

return data
    }
    catch(err){
console.log(err)

    }
}



async createComment(payload:any){

let url=`${VITE_APP_KYC}/api/comments`

    try{
     let data= axios.post(url,payload)
     return data
    }
    catch(err){

        console.log(err)
    }
}


async getCharges(souceCountry,destinationCountry,amount,segment){

  let url=`${VITE_APP_STATIC}/charges/filter?sendingCountry=SA&receivingCountry=${destinationCountry}&amount=${amount}&marketSegment=${segment}`
    try{
let data=await axios.get(url)
return (data)

    }
    catch(err){



    }
}


}