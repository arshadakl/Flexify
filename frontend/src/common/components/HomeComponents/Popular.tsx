import React from 'react';
import { motion, MotionConfig } from "framer-motion"
import { fadeIn } from '../../animations/Frame_Motion/variants';

interface CardData {
 imageSrc: string;
 altText: string;
 title: string;
}

// Define the data for each card
const popularServices: CardData[] = [
 {
    imageSrc: "images/popular/logo-design-2x.jpg",
    altText: "Image 1",
    title: "Graphics & Design"
 },
 {
    imageSrc: "images/popular/wordpress-2x.jpg",
    altText: "Image 2",
    title: "Programming & Tech"
 },
 {
    imageSrc: "images/popular/social-2x.jpg",
    altText: "Image 3",
    title: "Video & Animation"
 },
 {
    imageSrc: "images/popular/translation-2x.jpg",
    altText: "Image 4",
    title: "Writing & Translation"
 },
 {
    imageSrc: "images/popular/voice-over-2x.jpg",
    altText: "Image 5",
    title: "Music & Audio"
 },
 {
    imageSrc: "images/popular/ai-artists-2x.jpg",
    altText: "Image 6",
    title: "AI Services"
 }
];


interface CardProps {
 imageSrc: string;
 altText: string;
 title: string;
}

const Card: React.FC<CardProps & { progress: number }> = ({ imageSrc, altText, title, progress  }) => (
  <motion.div variants={fadeIn("right", progress)} initial="hidden" whileInView={"show"} className="flex-none w-56 relative" >
    <img className="w-full h-auto rounded" src={imageSrc} alt={altText} />
    <div className="absolute top-0 left-0 p-4 text-white">
      {title}
    </div>
 </motion.div>
);

const Popular: React.FC = () => {
 return (
    <>
    <MotionConfig transition={{ duration: 1 }}>
      <div className="min-h-screen items-center justify-center px-24">
        <motion.h2  variants={fadeIn("right",0.5)} initial="hidden" whileInView={"show"} viewport={{once:true}} className="text-xl font-bold mb-4 mt-16 mx-4">Popular services</motion.h2>
        <div className="flex popularCards overflow-scroll space-x-4 p-4">
          {popularServices.map((service, index) => (
            <Card key={index} {...service} progress={(index - 1) / (popularServices.length - 1) * 0.9 + 0.1} />
          ))}
        </div>
      </div>
      </MotionConfig>
    </>
 );
}

export default Popular;
