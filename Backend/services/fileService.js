const path = require("path");
const ExcelJS = require("exceljs");
const { parse } = require("csv-parse/sync");

const allowedExtensions = [".csv", ".xls", ".xlsx"];

async function readUploadedFile(file) {
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    throw new Error("Unsupported file type. Upload CSV, XLS, or XLSX.");
  }

  if (extension === ".csv") {
    const fs = require("fs");
    const content = fs.readFileSync(file.path, "utf8");
    const rows = parse(content, {
      skip_empty_lines: true,
      bom: true,
    });

    return {
      headers: rows[0] || [],
      rows: rows.slice(1),
    };
  }

  if (extension === ".xlsx") {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(file.path);

    const sheet = workbook.worksheets[0];

    if (!sheet) {
      throw new Error("The Excel file has no worksheet.");
    }

    const headers = [];
    sheet.getRow(1).eachCell({ includeEmpty: true }, (cell, col) => {
      headers[col - 1] = cell.value;
    });

    const rows = [];

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        rows.push(row.values.slice(1));
      }
    });

    return { headers, rows };
  }

  throw new Error(
    "Legacy XLS files are not supported yet. Please save as XLSX."
  );
}

module.exports = { readUploadedFile };