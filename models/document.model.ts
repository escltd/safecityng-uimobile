export interface IDocument {
  ID: string,
  Code: string,
  Workflow: string,
  
  Createdate: string,
  Createdby: string,
  Updatedate: string,
  Updatedby: string,

  Ownerid: string,
  Profileid: string,

  Title: string,
  Description: string,

  Doctype: string,
  Filename: string,
  Filemeta: string,
  Filetype: string,
  Filepath: string,
  Issuedby: string,
  Issuedto: string,
  Validfrom: string,
  Validuntil: string,
  Issuedate: string,
  Position: number,
  Filesize: number,
  Tablerefid: string,
}