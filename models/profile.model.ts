export interface IProfile {
  id: string,
  code: string,
  workflow: string,
  
  isadmin: boolean,
  iscompany: boolean,
  isuser: boolean,
  issupport: boolean,

  image: string,
  title: string,
  firstname: string,
  lastname: string,
  othername: string,
  fullname: string,

  email: string,
  mobile: string,

  dob:	string,
  gender: string,
  maritalstatus: string,
  employer: string,

  state: string,
  street: string,
  city:	string,
  country:	string,
  
  description:	string,
  occupation:	string,
  referrer: string,

  ownerid:	string,
  profileid:	string,
  
  createdate: string,
  createdby: string,
  updatedate:	string,
  updatedby:	string,
}