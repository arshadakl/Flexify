import { useEffect, useState } from "react";
import PostStepStatus from "../../common/components/ExtraComponents/PostStepStatus";
import NavBar from "../../common/components/Navbar/NavBar";
import CreatePostOver from "../../freelancers/components/CreatePostOver";
import CreatePostDescription from "../../freelancers/components/CreatePostDescription";

function CreatePost() {
    const [step, setStep] = useState<number>(1);
    const [stepStages, setStepStages] = useState({
        first: true,
        second: false,
        third: false,
    });
    
    useEffect(() => {
        if (step >= 1) {
            setStepStages(prevState => ({
                ...prevState,
                first: true,
            }));
        }
        if (step >= 2) {
            setStepStages(prevState => ({
                ...prevState,
                second: true,
            }));
        }
        if (step >= 3) {
            setStepStages(prevState => ({
                ...prevState,
                third: true,
            }));
        }
    }, [step]);

  const [formData, setFormData] = useState<any>({
    title: "",
    category: "",
    subcategory: "",
    tags: [],
  });

  // useEffect(() => {
  //  console.log(formData);

  // }, [formData])

  return (
    <>
      <NavBar bg="white" fixed="none" />
      <PostStepStatus step={step} />
      { step==1 ? <CreatePostOver setStep={setStep} formData={formData} setFormData={setFormData} /> : null}
      {step==2 ? <CreatePostDescription setStep={setStep}/> : null}
    </>
  );
}

export default CreatePost;
