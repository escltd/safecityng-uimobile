export interface IUser {
  id: string,
  code: string,
  workflow: string,

  isadmin: boolean,
  iscompany: boolean,
  isuser: boolean,
  issupport: boolean,

  image: string,
  title: string,
  username: string,

  failed: number,
  failedmax: number,

  email: string,
  mobile: string,

  ownerid: string,
  profileid: string,

  createdate: string,
  createdby: string,
  updatedate: string,
  updatedby: string,

}