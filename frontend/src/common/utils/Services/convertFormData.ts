import { DetailsINter } from "../../../interfaces/Freelancer";



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