import React, { useRef, useState } from 'react';

function CameraImageUpload() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [imageData, setImageData] = useState(null);

  const handleChooseFileClick = async () => {
    try {
      // Access the user's media devices
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });

      // Assign the stream to a video element to display the camera feed
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access the camera. Please make sure your camera is properly connected.');
    }
  };

  const handleCaptureClick = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Capture a frame from the video and display it on the canvas
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the captured frame to a data URL
      const capturedImageData = canvas.toDataURL('image/jpeg');
      setImageData(capturedImageData);
    }
  };

  return (
    <div>
             <div className="mb-4">
//             <label
              htmlFor="filePath"
              className="block text-gray-700 font-semibold"
            >
              File Path:
            </label>
            <input
              type="file"
              id="filePath"
              name="filePath"
              onChange={handleChooseFileClick}
              className="w-full p-2 border rounded"
            />
          </div>
      <button onClick={handleChooseFileClick}>Open Rear Camera</button>
      <video ref={videoRef} autoPlay style={{ display: '' }} />
      <button onClick={handleCaptureClick}>Capture</button>
      {imageData && <img src={imageData} alt="Captured" />}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default CameraImageUpload;
