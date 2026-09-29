const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");

const OUTPUT_DIR = path.join(__dirname, "..", "outputs");

function escapeCsvValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  let text = String(value);

  // Escape quotes by doubling them.
  text = text.replace(/"/g, '""');

  // Quote values containing commas, quotes, or line breaks.
  if (/[",\r\n]/.test(text)) {
    text = `"${text}"`;
  }

  return text;
}

function createCsv(headers, rows) {
  const allRows = [headers, ...rows];

  return allRows
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\r\n");
}

async function generateOutputFiles({
  jobId,
  originalName,
  headers,
  rows,
  selectedRows,
  extension,
}) {
  const jobDir = path.join(OUTPUT_DIR, jobId);

  fs.mkdirSync(jobDir, { recursive: true });

  const markedXlsxPath = path.join(jobDir, "marked.xlsx");
  const selectedCsvPath = path.join(jobDir, "selected.csv");

  // Convert selected indexes into a Set for quick lookup.
  const selectedIndexes = new Set(selectedRows);

  // 1. Generate the marked XLSX.
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Processed Data");

  worksheet.addRow(headers);

  rows.forEach((row, index) => {
    const excelRow = worksheet.addRow(row);

    if (selectedIndexes.has(index)) {
      excelRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF0000" },
        };
      });
    }
  });

  await workbook.xlsx.writeFile(markedXlsxPath);

  // 2. Generate the CSV containing selected rows only.
  const selectedData = selectedRows.map((index) => rows[index]);
  const csvContent = createCsv(headers, selectedData);

  fs.writeFileSync(selectedCsvPath, csvContent, "utf8");

  return {
    markedXlsxPath,
    selectedCsvPath,
  };
}

module.exports = { generateOutputFiles };