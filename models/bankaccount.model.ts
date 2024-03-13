export interface IBankaccount {
  ID: string,
  Code: string,
  Workflow: string,
  
  Createdate: string,
  Createdby: string,
  Updatedate: string,
  Updatedby: string,

  Ownerid: string,
  Profileid: string,

	Currency:      string,
	Country:       string,
	Bankname:      string,
	Accountname:   string,
	Accountnumber: string,
	Iban:          string,
	Swift:         string,
	Bankaddress:   string,
	Accounttype:   string,
}