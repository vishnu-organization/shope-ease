import { useRef, useState } from "react";
import { Box, Button } from "@mui/material";

const EyeSegmentation = () => {
  const fileInputRef = useRef(null);
  const [url, setUrl]= useState<string>('');
  const [imageUrl, setImageUrl] = useState(null);


const onResponse = async () => {
  const formData = new FormData();
  formData.append('file', fileInputRef?.current.files[0]);

  formData.append('username', 'exampleUser');
  formData.append('description', 'Sample file upload');

  try {
    const response = await fetch('http://3.83.226.165:8000/process-image?return_json=True', {
      method: 'POST',
      body: formData,
    });

    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Server response (JSON):', data);
      setUrl(data.image_data)
    } else if (contentType && contentType.includes('image')) {
      const blob = await response.blob();
      console.log('Received Blob:', blob);
      const imageUrl = URL.createObjectURL(blob);
      console.log('Generated image URL:', imageUrl);


    } else {
      console.log('Unknown response type:', contentType);
    }
  } catch (error) {
    console.error('Error during file upload:', error);
  }
};

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the Base64 image URL to state
      };
      reader.readAsDataURL(file); // Convert the file to Base64 data URL
    }
  };

  const base64Image = `data:image/jpeg;base64, ${url}`;

  return (
      <Box display='flex' justifyContent='space-between' gap={6} mt={12} >
          <Box flex={1} bgcolor='grey' height='350px' borderRadius={5} p={6}>
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {imageUrl && <img src={imageUrl} alt="Selected" style={{ width: '200px', height: 'auto' }} />}
          </Box>
          <div style={{height:'30px',backgroundColor:'white',textWrap:'wrap',color:"black" ,padding:10,borderRadius:"10px",alignSelf:"center"}} onClick={onResponse}>Response</div>
          {/* <Button color="secondary" style={{backgroundColor:'white', height:'50px', alignSelf:'center',textWrap:'wrap'}} onClick={onResponse}>Response</Button> */}
          <Box flex={1} height='350px' bgcolor='grey'borderRadius={5} p={6} >
          { 
            url !== '' && <img style={{width:'100%',height:'100%',objectFit:'contain'}} src={base64Image} alt="Base64 Example"  />
          }           
          </Box>
      </Box>
  );
};

export default EyeSegmentation;