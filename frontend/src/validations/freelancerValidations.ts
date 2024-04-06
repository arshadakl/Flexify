

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