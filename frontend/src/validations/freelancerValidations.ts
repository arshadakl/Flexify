

export const postOverviewValidation = (formData:any): string => {
    console.log(formData);
  
    if (!formData.title.trim()) {
      // toast.error("Please enter a username.");
      return "Please enter Work Title";
    }
    if (!formData.category.trim()) {
      return "Please select Category.";
    }

    if (!formData.subcategory.trim()) {
      return "Please  select Subcategory.";
    }

    if (formData.tags.length <= 0 ) {
      return "Please add Aleast 1 Tag.";
    }

    return "success";
  
  }


export const postDiscriptionValidation = (formData:any): string => {
    console.log(formData);
  
    if (formData.images.first==null) {
      // toast.error("Please enter a username.");
      return "Atleast one image is required";
    }
    if (formData.deliveryPeriod<=0 ) {
      return "Enter valid Delivery time Period.";
    }

    if (formData.deliveryPeriod>=30 ) {
      return "you cannot set Delivery Time Period more than 30 days";
    }

    if (!formData.description.trim()) {
      return "Please type description";
    }

    if (formData.amount<=100)  {
      return "Please set amount above 100";
    }

    return "success";
  
  }