import { useRef, useState } from "react";
import { Backdrop, Box, CircularProgress } from "@mui/material";

const EyeSegmentation = () => {
  const fileInputRef = useRef(null);
  const [url, setUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onResponse = async () => {
    const formData = new FormData();
    formData.append("file", fileInputRef?.current.files[0]);

    formData.append("username", "exampleUser");
    formData.append("description", "Sample file upload");

    try {
      setIsLoading(true);
      const response = await fetch(
        "http://3.83.226.165:8000/process-image?return_json=True",
        {
          method: "POST",
          body: formData,
        }
      );

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Server response (JSON):", data);
        setUrl(data.image_data);
        setIsLoading(false);
      } else if (contentType && contentType.includes("image")) {
        const blob = await response.blob();
        console.log("Received Blob:", blob);
        const imageUrl = URL.createObjectURL(blob);
        console.log("Generated image URL:", imageUrl);
      } else {
        console.log("Unknown response type:", contentType);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: any) => {
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
    <Box display="flex" justifyContent="space-between" gap={6} mt={12}>
      <Box
        flex={1}
        bgcolor="grey"
        height="350px"
        borderRadius={5}
        p={6}
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Selected image"
            style={{
              width: "80%",
              height: "auto",
              alignSelf: "center",
              borderRadius: "10px",
            }}
          />
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      </Box>
      <div
        style={{
          height: "30px",
          backgroundColor: "white",
          textWrap: "wrap",
          color: "black",
          padding: 10,
          borderRadius: "10px",
          alignSelf: "center",
          cursor: "pointer",
        }}
        onClick={onResponse}
      >
        Response
      </div>
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="350px"
        bgcolor="grey"
        borderRadius={5}
        p={5}
      >
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          url !== "" && (
            <img
              src={base64Image}
              alt="Base64 Example"
              style={{
                width: "80%",
                height: "auto",
                alignSelf: "center",
                borderRadius: "10px",
              }}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default EyeSegmentation;
