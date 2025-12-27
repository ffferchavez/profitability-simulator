import Papa from 'papaparse';

export async function parseCsv<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  const text = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse<T>(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}

