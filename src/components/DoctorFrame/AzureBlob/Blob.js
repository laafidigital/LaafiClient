// import { BlobServiceClient } from '@azure/storage-blob';

// // Initialize the BlobServiceClient
// const accountName = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_NAME;
// const accountKey = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_KEY;
// const connectionString = process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING;

// let blobServiceClient;

// if (connectionString) {
//     blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
// } else {
//     console.error("Connection string is not defined");
// }

// // Function to upload a file to Azure Blob Storage
// export const uploadToBlob = async (file, containerName) => {
//     if (!blobServiceClient) {
//         throw new Error("BlobServiceClient is not initialized");
//     }

//     // Generate a unique blob name
//     const blobName = `${Date.now()}-${file.name}`;
//     const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

//     try {
//         const response = await fetch(blobUrl, {
//             method: 'PUT',
//             headers: {
//                 'x-ms-blob-type': 'BlockBlob',
//                 'Content-Type': file.type,
//             },
//             body: file,
//         });

//         if (!response.ok) {
//             throw new Error(`Upload failed: ${response.statusText}`);
//         }

//         return blobUrl; // Return the blob URL
//     } catch (error) {
//         console.error('Error uploading to Blob Storage:', error);
//         throw new Error('Blob upload failed');
//     }
// };
