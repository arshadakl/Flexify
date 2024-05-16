import { useEffect, useState } from "react";
import PostStepStatus from "../../common/components/ExtraComponents/PostStepStatus";
import NavBar from "../../common/components/Navbar/NavBar";
import CreatePostOver from "../../freelancers/components/CreatePostOver";
import CreatePostDescription from "../../freelancers/components/CreatePostDescription";
import CreatePostPublish from "../../freelancers/components/CreatePostPublish";
import { DetailsINter } from "../../interfaces/Freelancer";
import {  createFormData } from "../../common/utils/Services/convertFormData";
import AxiosInterceptor, { workPostAPI } from "../../common/utils/APIs/FreelancerApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Footer from "../../common/components/HomeComponents/Footer";

function CreatePost() {
  const [isLoad,setIsloading] = useState<boolean>(false)

    const [step, setStep] = useState<number>(1);
    const [stepStages, setStepStages] = useState({
        first: true,
        second: false,
        third: false,
    });

    const navigate = useNavigate()
        console.log(stepStages);
        
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


  
  const [details, setDetails] = useState<DetailsINter>({
    images:{first:"",second:"",third:""},
    deliveryPeriod: 1,
    referenceMaterial: false,
    logo:false,
    description:"",
    questionnaire: [],
    amount:1000 
  });

  useEffect(() => {
  }, [details])

  const handileSubmite = async ()=>{

      const formDataInstance: FormData =  createFormData(formData, details);
      setIsloading(true)
        const response = await workPostAPI(formDataInstance)
        if(response.status){
          setIsloading(false)
          navigate('/profile')
        }else{
          toast.error(response.error)
        }
        
  }
  

  return (
    <>
    <AxiosInterceptor/>
      <NavBar bg="white" fixed="none" />
      <PostStepStatus step={step} />
      { step==1 ? <CreatePostOver setStep={setStep} formData={formData} setFormData={setFormData} /> : null}
      {step==2 ? <CreatePostDescription  details={details} setDetails={setDetails} setStep={setStep}/> : null}
      {step==3 ? <CreatePostPublish isLoad={isLoad} setStep={setStep} formData={formData} details={details} handileSubmite={handileSubmite} /> : null}
      <Footer/>
    </>
  );
}

export default CreatePost;
