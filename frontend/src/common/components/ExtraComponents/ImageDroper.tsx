// import { useState, ChangeEvent, useRef, useEffect } from 'react';
// import Cropper from 'cropperjs';
// import 'cropperjs/dist/cropper.css';

// interface ImageDroperProps {
//   previewImage: string | null;
//   setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
//   croppedImage: string | null;
//   setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
//   name:string
//   isOpen:Boolean
// }

// function ImageDroper({ previewImage, setPreviewImage, croppedImage, setCroppedImage,name,isOpen }: ImageDroperProps) {
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const imageRef = useRef<HTMLImageElement>(null);
//   const cropperRef = useRef<Cropper>();

//   useEffect(() => {
//     if (imageRef.current && previewImage && showModal) {
//       cropperRef.current = new Cropper(imageRef.current, {
//         aspectRatio: 16 / 9, // Adjust aspect ratio as needed
//         viewMode: 2, // Adjust view mode as needed
//       });
//     }
//     // Cleanup cropper instance
//     return () => {
//       if (cropperRef.current) {
//         cropperRef.current.destroy();
//         cropperRef.current = undefined;
//       }
//     };
//   }, [previewImage, showModal]);

//   const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setPreviewImage(imageUrl);
//       setShowModal(true); // Show modal on image upload
//       setCroppedImage(null); // Reset cropped image on new upload
//     }
//   };

//   const handleCrop = () => {
//     if (cropperRef.current) {
//       const canvas = cropperRef.current.getCroppedCanvas();
//       if (canvas) {
//         const croppedImageUrl = canvas.toDataURL(); // Get cropped image as base64 string
//         setCroppedImage(croppedImageUrl);
//         setShowModal(false); // Close modal after cropping
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setCroppedImage(null);
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-center w-full">
//         {isOpen ? <label
//           htmlFor={name}
//           className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//         >
//           {previewImage ? (
//             <>
//               <div className="relative w-full h-36 rounded-lg overflow-hidden">
//                 <img
//                   ref={imageRef}
//                   src={croppedImage ? croppedImage : previewImage}
//                   alt="Preview"
//                   className="w-full h-full object-cover"
//                 />

//                 <button
//                   className="absolute top-2 right-2 bg-red-700 text-white px-2 py-1 rounded-md hover:bg-red-800"
//                   onClick={() => {setPreviewImage(null) ;setCroppedImage(null)}}
//                 >
//                   <i className="fa-regular fa-xmark"></i>
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <svg
//                   className="w-6 h-6 mb-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 16"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                   />
//                 </svg>
//                 <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
//                   <span className="font-semibold">Click to upload</span>
//                 </p>
//                 <p className="text-[10px] text-gray-500 dark:text-gray-400">
//                   JPG, PNG, or SVG
//                 </p>
//               </div>
//             </>
//           )}
//           <input
//             id={name}
//             type="file"
//             className="hidden"
//             onChange={handleImageUpload}
//           />
//         </label> : 
//         <>
//         <div className="flex flex-col   items-center justify-center h-32">
//           <svg
//             className="w-10 h-10 mb-4 text-gray-200 dark:text-gray-400"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 16"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//             />
//           </svg>
//           <p className="text-[10px] text-gray-300 dark:text-gray-400">
//             JPG, PNG, or SVG
//           </p>
//         </div>
//       </>
//         }
//       </div>

//       {/* Modal for cropping */}
//       {showModal && (
//         <div className="fixed inset-0  flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
//           <div className="bg-white p-4 rounded-lg w-3/6">
//             <div className="relative">
//               <img
//                 ref={imageRef}
//                 src={previewImage || ''}
//                 alt="Cropping Preview"
//                 style={{ maxHeight: '80vh' }}
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 className="absolute top-2 right-2 bg-red-700 text-white px-2 py-1 rounded-md hover:bg-red-800"
//                 onClick={handleCloseModal}
//               >
//                 <i className="fa-regular fa-xmark"></i>
//               </button>
//             </div>
//             <div className="flex justify-center mt-4">
//               <button
//                 className="bg-logo-green hover:bg-logo-green text-white px-4 py-2 rounded-md mr-2"
//                 onClick={handleCrop}
//               >
//                 Crop
//               </button>
//               <button
//                 className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
//                 onClick={handleCloseModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageDroper;






import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

interface ImageDroperProps {
  previewImage: string | null;
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
  croppedImage: File | null;
  setCroppedImage: React.Dispatch<React.SetStateAction<File | null>>;
  name: string;
  isOpen: boolean;
}

function ImageDroper({ previewImage, setPreviewImage, croppedImage, setCroppedImage, name, isOpen }: ImageDroperProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper>();

  useEffect(() => {
    if (imageRef.current && previewImage && showModal) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio: 16 / 9, // Adjust aspect ratio as needed
        viewMode: 2, // Adjust view mode as needed
      });
    }
    // Cleanup cropper instance
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
        cropperRef.current = undefined;
      }
    };
  }, [previewImage, showModal]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setShowModal(true); // Show modal on image upload
      setCroppedImage(null); // Reset cropped image on new upload
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      if (canvas) {
        const croppedImageUrl = canvas.toDataURL(); // Get cropped image as base64 string
        convertBase64ToFile(croppedImageUrl); // Convert base64 to file
        setShowModal(false); // Close modal after cropping
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCroppedImage(null);
  };

  const convertBase64ToFile = (croppedImageUrl: string) => {
    fetch(croppedImageUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'cropped_image.png', { type: 'image/png' });
        setCroppedImage(file); // Set cropped image as a file
      })
      .catch(error => {
        console.error('Error converting base64 to file:', error);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        {isOpen ? <label
          htmlFor={name}
          className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {previewImage ? (
            <>
              <div className="relative w-full h-36 rounded-lg overflow-hidden">
                <img
                  ref={imageRef}
                  src={croppedImage ? URL.createObjectURL(croppedImage) : previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                <button
                  className="absolute top-2 right-2 bg-red-700 text-white px-2 py-1 rounded-md hover:bg-red-800"
                  onClick={() => { setPreviewImage(null); setCroppedImage(null) }}
                >
                  <i className="fa-regular fa-xmark"></i>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-6 h-6 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  JPG, PNG, or SVG
                </p>
              </div>
            </>
          )}
          <input
            id={name}
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label> :
          <>
            <div className="flex flex-col   items-center justify-center h-32">
              <svg
                className="w-10 h-10 mb-4 text-gray-200 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-[10px] text-gray-300 dark:text-gray-400">
                JPG, PNG, or SVG
              </p>
            </div>
          </>
        }
      </div>

      {/* Modal for cropping */}
      {showModal && (
        <div className="fixed inset-0  flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded-lg w-3/6">
            <div className="relative">
              <img
                ref={imageRef}
                src={previewImage || ''}
                alt="Cropping Preview"
                style={{ maxHeight: '80vh' }}
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-2 right-2 bg-red-700 text-white px-2 py-1 rounded-md hover:bg-red-800"
                onClick={handleCloseModal}
              >
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-logo-green hover:bg-logo-green text-white px-4 py-2 rounded-md mr-2"
                onClick={handleCrop}
              >
                Crop
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageDroper;
