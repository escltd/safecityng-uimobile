export interface IAccount {
  id: string,
  code: string,
  workflow: string,
  
  createdate: string,
  createdby: string,
  updatedate: string,
  updatedby: string,

  ownerid: string,
  profileid: string,
  
  chartid: string,
  transactionid: string,

  title: string,
  currency: string,
  balance: number,

  isdefault: boolean,
}