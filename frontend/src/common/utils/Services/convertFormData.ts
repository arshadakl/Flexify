import { DetailsINter } from "../../../interfaces/Freelancer";

// export const convertToFormData = (formData: any, details: DetailsINter): FormData => {
//     const formDataObject = { ...formData, ...details };
//     const formDataInstance = new FormData();
  
//     for (const key in formDataObject) {
//       if (formDataObject.hasOwnProperty(key)) {
//         const value = formDataObject[key];
//         if (Array.isArray(value)) {
//           value.forEach((item: any) => formDataInstance.append(key, item));
//         } else if (typeof value === 'object' && value !== null) {
//           for (const nestedKey in value) {
//             if (value.hasOwnProperty(nestedKey)) {
//               formDataInstance.append(`${key}.${nestedKey}`, value[nestedKey]);
//             }
//           }
//         } else {
//           formDataInstance.append(key, value);
//         }
//       }
//     }
  
//     return formDataInstance;
//   };



// export const convertToFormDatanew = (formData: any, details: DetailsINter): FormData => {
//     const formDataObject = { ...formData, ...details };
//     const formDataInstance = new FormData();
//     let imageCounter = 1; // Counter for images
    
//     for (const key in formDataObject) {
//         if (formDataObject.hasOwnProperty(key)) {
//             const value = formDataObject[key];
//             if (Array.isArray(value)) {
//                 value.forEach((item: any) => {
//                     if (item instanceof File) {
//                         formDataInstance.append(`image${imageCounter}`, item);
//                         imageCounter++;
//                     } else {
//                         formDataInstance.append(key, item);
//                     }
//                 });
//             } else if (typeof value === 'object' && value !== null) {
//                 for (const nestedKey in value) {
//                     if (value.hasOwnProperty(nestedKey)) {
//                         formDataInstance.append(`${key}.${nestedKey}`, value[nestedKey]);
//                     }
//                 }
//             } else {
//                 formDataInstance.append(key, value);
//             }
//         }
//     }
  
//     return formDataInstance;
// };


// export const convertToFormData = (formData: any, details: DetailsINter): FormData => {
//   const formDataInstance = new FormData();

//   // Append formData
//   for (const key in formData) {
//     if (formData.hasOwnProperty(key)) {
//       const value = formData[key];
//       if (Array.isArray(value)) {
//         value.forEach((item: any) => formDataInstance.append(key, item));
//       } else {
//         formDataInstance.append(key, value);
//       }
//     }
//   }

//   // Append details
//   for (const key in details) {
//     if (details.hasOwnProperty(key)) {
//       const value = details[key as keyof DetailsINter]; // Type assertion here
//       if (key === 'images' && typeof value === 'object' && value !== null) {
//         if ('first' in value && 'second' in value && 'third' in value) {
//           formDataInstance.append(`details.images.first`, value.first);
//           formDataInstance.append(`details.images.second`, value.second);
//           formDataInstance.append(`details.images.third`, value.third);
//         }
//       } else if (typeof value === 'object' && value !== null) {
//         formDataInstance.append(`details.${key}`, JSON.stringify(value));
//       } else {
//         formDataInstance.append(`details.${key}`, value.toString());
//       }
//     }
//   }

//   return formDataInstance;
// };


export const createFormData = (formData:any,details:DetailsINter): FormData => {
  const newFormData = new FormData();

  // Append data from formData
  for (const key in formData) {
    newFormData.append(key, formData[key]);
  }

  // const images = [details.images.first, details.images.second, details.images.third];
  // images.forEach((image, index) => {
  //    newFormData.append(`images[${index}]`, image);
  // });

  // Append data from details
  newFormData.append('image1', details.images.first);
  newFormData.append('image2', details.images.second);
  newFormData.append('image3', details.images.third);
  newFormData.append('deliveryPeriod', details.deliveryPeriod as any);
  newFormData.append('referenceMaterial', details.referenceMaterial.toString()); // Ensure boolean conversion
  newFormData.append('logo', details.logo.toString()); // Ensure boolean conversion
  newFormData.append('description', details.description);
  newFormData.append('questionnaire', JSON.stringify(details.questionnaire)); // Handle questionnaire properly
  newFormData.append('amount', details.amount.toString()); // Ensure number conversion

  return newFormData;
};