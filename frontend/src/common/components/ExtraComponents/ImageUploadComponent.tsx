import React, { useState, useRef, useContext, useEffect } from 'react';
import { uploadProfileImage } from '../../../common/utils/APIs/FreelancerApi';
import { AuthContext } from '../../utils/config/context';
// import { FreelancerInterface } from '../../../interfaces/Freelancer';

// Define the component
function ImageUploadComponent() {
  // State variables
  const [imageSrc, setImageSrc] = useState<string>("https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg");
  const [showUploadButton, setShowUploadButton] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {setFreelancerDetails,freelancerDetails} = useContext(AuthContext)


  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if(freelancerDetails){
        setImageSrc(freelancerDetails.profile)
    }
    
  }, [freelancerDetails])


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
          setShowUploadButton(true); 
        }
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleUploadButtonClick = async () => {
    if (!imageSrc) return; 

    try {
      
      const formData = new FormData();
      if (fileInputRef.current?.files) {
        formData.append('file', fileInputRef.current.files[0]);
      }

      const response:any = await uploadProfileImage(formData);
      const userDataString = JSON.stringify(response.userData);
      localStorage.setItem('user_data', userDataString);
      setFreelancerDetails(response.userData)
      console.log(response.userData,"local store item");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className='my-10'>
      <div>
        {/* Display selected image */}
        <img
          className="mx-auto w-24 h-24 mb-3 rounded-full shadow-lg object-cover cursor-pointer"
          src={imageSrc}
          alt="Bonnie image"
          onClick={handleImageClick}
        />
      </div>
      <div>
        {/* File input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {/* Upload button */}
        {showUploadButton && (
          <button
            onClick={handleUploadButtonClick}
            className="block mx-auto px-4 py-2 bg-gray-900 text-white rounded-lg shadow-md"
          >
            Upload Image
          </button>
        )}
      </div>
    </div>
  );
}

// Export the component
export default ImageUploadComponent;
