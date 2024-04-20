"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MdKeyboardControlKey } from "react-icons/md";

import internship1Photo from "@/public/assets/internship1.png";
import internship2Photo from "@/public/assets/internship2.png";
import internship3Photo from "@/public/assets/internship3.png";
import internship4Photo from "@/public/assets/internship4.jpeg";


type Internship = {
  url: string;
  description: string;
  title: string;
  photo: string;
};

const InternshipsPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [internships, setInternships] = useState<Internship[]>([
    {
      url: "https://www.se.com/us/en/about-us/careers/students-young-professionals.jsp",
      description: "Gain practical experience in innovative projects.",
      title: "SE Innovative Projects",
      photo: "/assets/internship1.png"
    },
    {
      url: "https://www.ncdot.gov/initiatives-policies/students-youth/internship-programs/Pages/summer-intern-program.aspx",
      description: "Explore career opportunities in a dynamic environment.",
      title: "NCDOT Internships",
      photo: "/assets/internship2.png"
    },
    {
      url: "https://research.redhat.com/internships/",
      description: "Join a team dedicated to sustainability and smart solutions.",
      title: "Red Hat Research",
      photo: "/assets/internship3.png"
    },
    {
      url: "https://jobs.cisco.com/jobs/SearchJobs/internship",
      description: "Work with industry leaders in cutting-edge research.",
      title: "Cisco Internships",
      photo: "/assets/internship4.jpeg"
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newInternship, setNewInternship] = useState<Internship>({ url: '', description: '', title: '', photo: '' });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % internships.length);
    }, 5000); 

    return () => clearInterval(intervalId);
  }, [internships.length]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInternships([...internships, { ...newInternship, photo: newInternship.photo || '/assets/placeholder.png' }]);
    setNewInternship({ url: '', description: '', title: '', photo: '' }); 
    setShowForm(false); 
  };

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center gap-12 md:gap-2 pb-12">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[35rem] w-full flex items-center justify-center"
      >
        <Image
          src={internships[currentSlide].photo}
          alt={`Internship Slide ${currentSlide + 1}`}
          layout="fill"
          objectFit="contain" 
          priority
        />
      </motion.div>
      <h1 className="text-4xl font-bold text-center text-[#7d1f2e]">Internship Opportunities</h1>
      <div className="grid grid-cols-2 gap-4 w-full md:w-3/4">
        {internships.map((internship, index) => (
          <a href={internship.url} key={index} target="_blank" rel="noopener noreferrer" className="relative p-4 border rounded-lg text-center block">
            <div className="h-64 w-full overflow-hidden"> 
              <Image src={internship.photo} alt={internship.title} layout="responsive" width={700} height={500} objectFit="contain" />
            </div>
            <p className="text-xl font-bold">{internship.title}</p>
            <p className="mt-2">{internship.description}</p>
          </a>
        ))}
      </div>
      <button onClick={() => setShowForm(!showForm)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        {showForm ? "Cancel" : "Add Internship"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
          <input type="text" placeholder="Internship Title" value={newInternship.title} onChange={(e) => setNewInternship({ ...newInternship, title: e.target.value })} required />
          <input type="text" placeholder="Description" value={newInternship.description} onChange={(e) => setNewInternship({ ...newInternship, description: e.target.value })} required />
          <input type="url" placeholder="URL" value={newInternship.url} onChange={(e) => setNewInternship({ ...newInternship, url: e.target.value })} required />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit Internship</button>
        </form>
      )}
      <Link href="/" className="text-blue-500 hover:text-blue-600">Return to home</Link>
    </div>
  );
};

export default InternshipsPage;