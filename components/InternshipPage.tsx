import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGlobalLoading } from '@/globalStates/useGlobalLoading';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';


const internshipsData = [
    {
        id: 1,
        title: 'Software Development Internship',
        summary: 'Participate in developing cutting-edge software solutions.',
        imageUrl: '/path/to/image.jpg', // Adjust path as needed
        fullText: 'This internship will allow you to work directly with our software development team on various projects...',
        linkUrl: 'https://example.com/internship-details',
        linkText: 'Learn More'
    },
    {
        id: 2,
        title: 'Data Analytics Internship',
        summary: 'Dive into big data and help us derive meaningful insights.',
        imageUrl: '/path/to/image2.jpg', // Adjust path as needed
        fullText: 'During this internship, you will be involved in analyzing large sets of data to support decision-making...',
        linkUrl: 'https://example.com/internship-data-analytics',
        linkText: 'Apply Now'
    },
];

const InternshipsPageContent = () => {
    const { setLoading } = useGlobalLoading();
    const router = useRouter();
    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000); // Simulate loading
    }, [setLoading]);

    const handleItemClick = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="internships-container">
            {internshipsData.map(internship => (
                <motion.div key={internship.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-lg shadow-lg p-4 hover:bg-gray-100 cursor-pointer my-2">
                    <div className="text-center" onClick={() => handleItemClick(internship.id)}>
                        <h2 className="text-xl font-bold text-[#333]">{internship.title}</h2>
                        <p className="text-[#666]">{internship.summary}</p>
                    </div>
                    {expandedId === internship.id && (
                        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 bg-white rounded-b-lg p-4 border-t border-gray-200">
                            <p className="text-[#666]">{internship.fullText}</p>
                            <a href={internship.linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {internship.linkText}
                            </a>
                            <div className="mt-4">
                                <Image
                                    src={internship.imageUrl}
                                    alt={`${internship.title} internship`}
                                    width={400}
                                    height={250}
                                    objectFit="cover"
                                />
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default InternshipsPageContent;
