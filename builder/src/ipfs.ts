const fs = require('fs');
const http = require('http');
const formData = require('form-data');

async function uploadFileFoIpfs(filePath:string):Promise<string>{
  return new Promise((resolve, reject) => {
    // Read file data
    const fileData = fs.readFileSync(filePath);

    // Create a new form data object
    const form = new formData();

    // Add the file to the form data
    form.append('file', fileData);

    // Set up the request options
    const options = {
      method: 'POST',
      hostname: 'ipfs-api.solenopsys.org',
      port: 80,
      path: '/api/v0/add',
      headers: form.getHeaders(),
    };

    // Make the request
    const req = http.request(options, (res) => {
      let data = '';

      // Collect the response data
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Handle the response
      res.on('end', () => {
        console.log(`Response status code: ${res.statusCode}`);

        try {
          const response = JSON.parse(data);
          const ipfsHash = response.Hash;
          console.log(`File uploaded to IPFS with hash: ${ipfsHash}`);
          resolve(ipfsHash);
        } catch (error) {
          console.error('Error parsing response:', error);
          reject(error);
        }
      });
    });

    // Handle request errors
    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    // Send the form data
    form.pipe(req);
  });
}

// Usage example
export {uploadFileFoIpfs}