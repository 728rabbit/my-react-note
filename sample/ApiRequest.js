/*
1. JSON POST + Token
apiRequest({
  url: '/api/save',
  method: 'POST',
  data: { name: 'John' },
  headers: { Authorization: 'Bearer token123' }
}).then(res => console.log(res)).catch(err => console.error(err));

2. Multiple file upload + other fields
const files = document.getElementById('upload').files;
apiRequest({
  url: '/api/upload',
  method: 'POST',
  data: { userId: 123 },
  files: { images: Array.from(files) },
  isFile: true
}).then(res => console.log(res)).catch(err => console.error(err));

3. Get blob / text
apiRequest({
  url: '/api/report.pdf',
  responseType: 'blob'
}).then(res => console.log(res)).catch(err => console.error(err));
*/

export async function apiRequest({
  url,
  method = 'GET',
  data = null,
  headers = {},
  isFile = false,
  files = {},
  responseType = 'json', // 'json' | 'text' | 'blob'
}) {
  const options = { method, headers: { ...headers } };

  if (method !== 'GET' && data) {
    if (isFile) {
      const formData = new FormData();

      
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      Object.entries(files).forEach(([key, fileList]) => {
        if (Array.isArray(fileList)) {
          fileList.forEach(file => formData.append(key, file));
        } else {
          formData.append(key, fileList);
        }
      });

      options.body = formData;
    } else {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  
  switch (responseType) {
    case 'text':
      return response.text();
    case 'blob':
      return response.blob();
    case 'json':
    default:
      return response.json();
  }
}