import { errorHandler } from '../utils/error.js';
import { db } from "../db.js";
import { Children } from 'react';



export const submitAppForm = async (req, res, next)=>{

    const {
         referenceID,
  PreviousSchoolName,
  LastClassInPreviousSchool,
  ReasonForLeaving,
  DateOfTransferCertificate,
  FirstName,
  MiddleName,
  LastName,
  Gender,
  DateOfBirth,
  Nationality,
  OtherNationality,
  StateOfOrigin,
  LGA,
  Religion,
  ParentName,
  ContactAddress,
  PhoneNumber,
  AlternativePhoneNumber,
  Email,
  ProfilePicture,
  applicationNumber,
  Password,
  Genotype,
  Health,
  PositionInFamily,
  deleted,
  sessionID    } = req.body

  // Generate sequential application number
  const countQuery = "SELECT COUNT(*) as total FROM applicants";
  
  db.query(countQuery, (countErr, countData) => {
    if(countErr) return next(countErr);
    
    const currentYear = new Date().getFullYear();
    const sequentialNumber = countData[0].total + 1;
    const generatedAppNumber = `APP${currentYear}${String(sequentialNumber).padStart(5, '0')}`;

    const query = `INSERT INTO applicants (  
      referenceID,
      PreviousSchoolName,
      LastClassInPreviousSchool,
      ReasonForLeaving,
      DateOfTransferCertificate,
      FirstName,
      MiddleName,
      SurName,
      Gender,
      DateOfBirth,
      Nationality,
      OtherNationality,
      StateOfOrigin,
      LGA,
      Religion,
      ParentName,
      ContactAddress,
      PhoneNumber,
      AlternativePhoneNumber,
      Email,
      ProfilePicture,
      applicationNumber,
      Password,
      Genotype,
      Health,
      PositionInFamily,
      deleted,
      SessionID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?)`

    const values =[ referenceID,
      PreviousSchoolName,
      LastClassInPreviousSchool,
      ReasonForLeaving,
      DateOfTransferCertificate,
      FirstName,
      MiddleName,
      LastName,
      Gender,
      DateOfBirth,
      Nationality,
      OtherNationality,
      StateOfOrigin,
      LGA,
      Religion,
      ParentName,
      ContactAddress,
      PhoneNumber,
      AlternativePhoneNumber,
      Email,
      ProfilePicture,
      generatedAppNumber,
      Password,
      Genotype,
      Health,
      PositionInFamily,
      deleted,
      sessionID]

    db.query(query, values, (err, data)=> {
      if(err) return next(err)
          
      return res.status(200).json({
        message: 'Application Submitted Successfully',
        applicationNumber: generatedAppNumber
      })
    })
  })




}
   
   


export const getSessions = async (req, res, next) =>{
     

    const query = "SELECT * FROM sessions WHERE active = 1 "

    db.query(query,(err,data)=>{
      if(err) return next(err)

        return res.status(200).json(data)
    })
}