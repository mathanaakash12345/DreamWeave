import React, { useState } from 'react';
import Header from './components/Header';
import drawing from '../saved_drawings/drawing.png'; // Consider if this should be dynamic
import st_icon from './assets/st_icon.png';
import Toast from './components/Toast';


export default function Home() {
  const [imagePath, setImagePath] = useState('');
  const [ImageData, setImageData] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isScribbleGenerated, setIsScribbleGenerated] = useState(false);
  const[isProcess, setIsProcess] = useState(false);
  const[isState, setIsState] = useState(false);
  const[isCenter, setIsCenter] = useState(false);
  
  const handlestartClick = async (e) => {
    e.preventDefault();
    setToastMessage('Process Start');
    setToastType('success');
    setShowToast(true);
    setIsProcess(true);
    

    try {
      const response = await fetch('http://localhost:5000/send-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: 1 }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsCenter(true);
        displayImageAndCaption(data);
      } else {
        throw new Error('Failed to send data');
      }
    } catch (error) {
      setToastMessage(error.message || 'Error occurred');
      setToastType('error');
      setShowToast(true);
      setIsProcess(false);
    }
  };

  const handleGenerateClick = async (e) => {
    e.preventDefault();
    setToastMessage('Sending scribble to Colab...');
    setToastType('success');
    setShowToast(true);
    setIsProcess(true);
    setIsState(false);
  
    try {
      // Load the image from the local path as a blob
      const response = await fetch(imagePath);
      const imageBlob = await response.blob();
  
      // Convert the blob to base64 format
      const base64Scribble = await convertBlobToBase64(imageBlob);
  
      // Send the base64 image data to the server
      const serverResponse = await fetch('https://9800-34-124-174-88.ngrok-free.app/process_scribble', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scribble_data: base64Scribble }), // Ensure key is correct
      });
  
      if (serverResponse.ok) {
        console.log("wait");
  
        // Ensure response is being parsed correctly
        const dataImage = await serverResponse.json();
  
        // Debugging: Log the response to verify its structure
        console.log("Colab Response:", dataImage);
  
        // Check if the rendered image exists in the response
        if (dataImage && dataImage.rendered_image) {
          displayGeneratedImage(dataImage.rendered_image);
        } else {
          throw new Error('No rendered image received from Colab');
        }
      } else {
        throw new Error('Failed to send data');
      }
    } catch (error) {
      setToastMessage(error.message || 'Error occurred');
      setToastType('error');
      setShowToast(true);
      setIsProcess(false);
    }
  };
  
// Helper function to convert blob/file to base64
const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result.split(',')[1]);  // Extract base64 without data prefix
        reader.onerror = (error) => reject(error);
    });
};


  
const displayGeneratedImage = (dataimage) => {
  if (dataimage) {
    // Correctly format the base64 string
    setImageData(`data:image/png;base64,${dataimage}`);
    setIsState(true);
    setIsProcess(false);
    setShowToast(false); // Optionally hide the toast if everything is successful
    console.log("Rendered image received and displayed!");
  } else {
    setToastMessage('Image data is missing in the generated image response');
    setToastType('error');
    setShowToast(true);
    setIsProcess(false);
  }
};
  

  const displayImageAndCaption = (data) => {
    if (data.imagePath) {
      setImagePath(data.imagePath);
    
      setIsScribbleGenerated(true);
      setIsProcess(false);
    } 
    else {
      setToastMessage('Image path or caption is missing in the response');
      setToastType('error');
      setShowToast(true);
      setIsProcess(false);
    }
  };



  return (
    <div>
      <Header />
      <div className='grid grid-cols-2 relative bottom-21'>
      <div className="flex flex-col items-start justify-center h-screen font-inter px-10 space-y-6">
        <h1 className="text-5xl font-bold">Discover</h1>
        <h1 className="text-5xl font-bold">DreamWeave</h1>
        <p className="text-lg text-gray-700 leading-relaxed max-w-md">
          Transform your gestures into art with our innovative hand gesture recognition system, where movements in the air become digital images. Experience creativity like never before.
        </p>
        
          {/* <button className="bg-purple-600 hover:bg-yellow-400 text-white font-semibold rounded-lg px-6 py-3 mt-5">
            START
          </button> */}

          <button 
            className="bg-purple-600  hover:scale-105 transition-transform duration-200 flex flex-row items-center rounded-lg px-5 py-3 text-center text-white mb-5" 
            onClick={handlestartClick}
          >
            <span className="mr-2 ease-in-out duration-300">START</span>
            <img src={st_icon} alt="start icon" className="h-6" />
          </button>
       

      </div>

        {/* <img src={pencil} alt="pencil icon" className='h-auto' /> */}
        <div className="flex flex-col items-center justify-center h-screen bg-white">
          
          <Toast
            message={toastMessage}
            type={toastType}
            showToast={showToast}
            setShowToast={setShowToast}
          />
          
          {/* <button 
            className="bg-purple-600 hover:bg-yellow-400 flex flex-row items-center rounded-lg px-5 py-3 text-center text-white mb-5" 
            onClick={handlestartClick}
          >
            <span className="mr-2 ease-in-out duration-300">START</span>
            <img src={st_icon} alt="start icon" className="h-6" />
          </button> */}

          {/* {isScribbleGenerated && (
            <button 
              className="bg-blue-500 hover:text-yellow-400 flex flex-row items-center rounded-lg px-5 py-3 text-center text-white mb-5" 
              onClick={handleGenerateClick}
            >
              <span className="mr-2">GENERATE</span>
              <img src={st_icon} alt="generate icon" className="h-6" />
            </button>
          )} */}




          {isCenter && (
            <div className="flex flex-col items-center px-6 mt-5 py-6">
              <img src={drawing} alt="Scribble" className="border-4 rounded-bl" />
              {/* <p className="text-xl text-center">{caption}</p> */}
            </div>
          )}   
            {isScribbleGenerated && (
            <button 
              className="bg-purple-600 hover:scale-105 transition-transform duration-200 flex flex-row items-center rounded-lg px-5 py-3 text-center text-white mb-5" 
              onClick={handleGenerateClick}
            >
              <span className="mr-2">GENERATE</span>
              {/* <img src={st_icon} alt="generate icon" className="h-6" /> */}
            </button>
          )}

            {isProcess && (
            <button
              type="button"
              className="bg-indigo-500 text-white rounded-lg flex items-center justify-center text-center px-4 py-3"
              disabled
            >
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            {/* Example SVG path */}
            <path d="M12 2a10 10 0 00-10 10h2a8 8 0 1116 0h2A10 10 0 0012 2z" />
          </svg>
              {/* <div className="w-3 h-3n bg-white rounded-full animate-bounce mr-3"></div> */}
              Processing...
            </button>
          )}
        </div>
      </div>
      
    { isState && (<div className='grid grid-cols-2 gap-4 border-4'>

      <div className='flex items-center justify-center'>
        {imagePath && (
          <div className=" flex flex-col items-center px-6 mt-5">
            <img src={drawing} alt="Scribble" className="border-2 rounded-bl h-96 w-full object-cover" />
            <p className="text-xl text-center">Scribble Image</p>
            <a
                  href={drawing}
                  download="scribble_image.png"
                  className="bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center font-bold py-2 px-4 rounded mt-4"
                >
                  Download Scribble Image
                </a>
          </div>

        )}
      </div>
      <div className='flex items-center justify-center'>
        {ImageData && (
          <div className='flex flex-col items-center justify-center'>
            <img src={ImageData} alt="Render Image" className='border-4 rounded-bl h-96 w-full object-cover' />
            <p className="text-xl text-center">Render Image</p>
            <a
          href={ImageData}
          download="rendered_image.png"
          className="bg-green-500 hover:bg-green-700 text-white flex items-center justify-center font-bold py-2 px-4 rounded mt-4"
        >
          Download Rendered Image
        </a>
          </div>
        )}
      </div>
    </div>
    )}
    </div>
  );
}

