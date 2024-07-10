import { useState } from 'react';
import axios from 'axios';

const useUploadFile = () => {
  const [uploading, setUploading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/auto/upload`;

  const uploadFile = async (file) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponseData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      setUploading(false);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, responseData, error };
};

export default useUploadFile;








// import { useState } from 'react';
// import axios from 'axios';

// const useUploadFile = () => {
//   const [uploading, setUploading] = useState(false);
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState(null);

//   const URL = 'https://api.imgur.com/3/image';
//   const CLIENT_ID = import.meta.env.VITE_IMGUR_CLIENT_ID;

//   const uploadFile = async (file) => {
//     setUploading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await axios.post(URL, formData, {
//         headers: {
//           'Authorization': `Client-ID ${CLIENT_ID}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setResponseData(response.data);
//       return response.data;
//     } catch (err) {
//       setError(err);
//       throw err;
//     } finally {
//       setUploading(false);
//     }
//   };

//   return { uploadFile, uploading, responseData, error };
// };

// export default useUploadFile;