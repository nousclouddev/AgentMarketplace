export interface CsvRecord {
  [key: string]: string;
}

export function parseCsv(csv: string): CsvRecord[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length === 0) return [];
  const headers = splitRow(lines[0]);
  const records: CsvRecord[] = [];

  for (const line of lines.slice(1)) {
    const values = splitRow(line);
    const record: CsvRecord = {};
    headers.forEach((h, idx) => {
      record[h.trim()] = values[idx] ? values[idx].trim() : '';
    });
    records.push(record);
  }
  return records;
}

function splitRow(row: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];

    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
