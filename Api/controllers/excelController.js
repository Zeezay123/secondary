import ExcelJS from 'exceljs' 
import { db } from '../db.js'
import path from 'path'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { errorHandler } from '../utils/error.js'


export const exportPaymentExcel = async(req,res,next)=>{

    try {
        
     const [rows] = await new Promise((resolve, reject)=>{
        const query = `SELECT * FROM formpayment` 
        db.query(query,(err,data)=>{
            if(err) return reject(err)

               resolve([data]) 

              
        })
     }) 
    

     if (!rows || rows.length == 0 ){
        res.status(200).json({message:'no data available'})
     }

    const workbook = new ExcelJS.Workbook()
    const worksheet =  workbook.addWorksheet('Form Payments')

       const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const logoPath = path.join(__dirname, '../image/delsulogo.png');
     
    const logo = workbook.addImage({
        filename:logoPath,
        extension: 'png',
    })

//    worksheet.addImage(logo,'B2:D6')

 worksheet.addImage(logo, {
      tl: { col: 3, row: 1 },
      ext: { width: 180, height: 100 },
    });



 worksheet.mergeCells('C9:F9');
    worksheet.getCell('C9').value = 'Delta State University Secondary School';
    worksheet.getCell('C9').font = { size: 14, bold: false };
    worksheet.getCell('C9').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };


       worksheet.mergeCells('C10:F11');
    worksheet.getCell('C10').value = 'Form Payments Report';
    worksheet.getCell('C10').font = { size: 18, bold: true };
    worksheet.getCell('C10').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

   

    

    worksheet.columns = [
      { header: "", key: "id", width: 10 },
      { header: "", key: "email", width: 25 },
      { header: "", key: "name", width: 25 },
      { header: "", key: "reference", width: 25 },
      { header: "", key: "amount", width: 15 },
      { header: "", key: "status", width: 15 },
      { header: "", key: "created_at", width: 25 },
      { header: "", key: "children", width: 30 },
    ]

    worksheet.addRow([])
    worksheet.addRow([
       'ID',
      'Email',
      'Name',
      'Reference',
      'Amount',
      'Status',
      'Created At',
      'No of Children'
    ])
    
    const headerRow = worksheet.lastRow;
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    rows.forEach((row) => {
        worksheet.addRow(row)
    });

    // worksheet.getRow(1).font = { bold: true };
    // worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=payments.xlsx"
    )
 await worksheet.protect('delsuSecure2025', {
      selectLockedCells: true,
      selectUnlockedCells: true,
      formatCells: false,
      formatColumns: false,
      formatRows: false,
      insertColumns: false,
      insertRows: false,
      insertHyperlinks: false,
      deleteColumns: false,
      deleteRows: false,
      sort: false,
      autoFilter: false,
      pivotTables: false,
    });

  await workbook.xlsx.write(res);
    res.status(200).end();

    } catch (error) {
        next(error)
    }

}

export const downloadpdf = async (req,res,next)=>{

 try {
    const rows = await new Promise((resolve, reject) => {
      const q = 'SELECT * FROM formpayment';
      db.query(q, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    if (!rows || rows.length === 0) {
      return res.status(200).json({ message: 'No data available' });
    }

    const doc = new PDFDocument({ margin: 40, size: 'A4' });
doc.pipe(res);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=payments_report.pdf');

    

    // Add logo
    // const logoPath = path.resolve(__dirname, '../image/delsulogo.png');
    // ;

     const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const logoPath = path.join(__dirname, '../image/delsulogo.png');
    
    doc.image(logoPath, {
        fit:[500, 200],
        align:'center',
        valign:'center'
     })
    // try {
    //   doc.image(logoPath, 50, 30, { width: 100 });
    // } catch (e) {
    //   console.warn("Logo not found or invalid path:", e.message);
    // }


    doc.moveDown(1);

    // Title
    doc.fontSize(18).text('Form Payments Report', { align: 'center' });
    doc.moveDown(1);

    // Table header
    doc.fontSize(12).text('ID   Email              Name             Amount    Status   Date         No. of Children', { underline: true });
    doc.moveDown(2);

    // Table rows
    rows.forEach(row => {
      doc.text(
        `${row.id}   ${row.email}   ${row.name}   ${row.amount}   ${row.status}   ${new Date(row.created_at).toLocaleDateString()}    ${row.children}`,
        { continued: false }
      );
      doc.moveDown(0.2);
    });

    doc.end();

  } catch (err) {
    next(err);
  }
}