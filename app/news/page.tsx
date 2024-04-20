"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';


import { useGlobalLoading } from '@/globalStates/useGlobalLoading';


import NewsItems from '@/components/NewsItems';


import newsBackground from '../../public/assets/newsBackground.png';


type NewsData = {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
    fullText: string;
    fullText2: string;
    fullText3: string;
    linkUrl: string; 
    linkText: string; 
};

const NewsPage = () => {
    const { setLoading } = useGlobalLoading();
    const [newsList, setNewsList] = useState<NewsData[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            const fetchedNews = [
                { id: 1, title: 'New Research Lab Opens', summary: 'A new state-of-the-art research lab located in Yancy building', imageUrl: '/assets/cis.jpg', fullText: 'Here at shaw university we are always striving to give our students the best recourses needed to be successful in courses and in life. We have now adding a new computer lab including the newest and latest technology needed to keep students up to date with the everchanging innovations availble. This Lab also included a state of the art, real time cybersecurity tracker which comeplements our new cyber security courses now offered at Shaw University.', fullText2: ' ', linkUrl: 'https://www.shawcomputerscience.com', linkText: 'Learn more about the lab' },
                { id: 2, title: 'NSBE Conference 2025', summary: 'Join us for the annual National Society of Black Engineers conference', imageUrl: '/assets/nsbe.png', fullText: 'Shaw University has recently join NSBE with our first chapter being created in 2023. We are very excited about the knowledge and oppurtunities this will provide for out students. We plan on making our way to the 2025 NSBE convention and will update students as dates and plans are avalible. In the meantime look at the NSBE webpage to get familiar with there goals and accolades.', fullText2: ' ', linkUrl: 'https://www.nsbe.org', linkText: 'Visit NSBE Conference site' },
                { id: 3, title: 'Cyber Security', summary: 'We are now offering cyber security courses in the CSC program!', imageUrl: '/assets/comSciWallPic.jpg', fullText: 'Cybersecurity is a key factor in the everyday life of almost every person on the earth. This carrer path isnt just sought after for well pay but also because cybersecurity is vital and nescessary for the safety of the nation and its civillians. If you are interested in cybersecurity then look no further as Shaw University now offers a cybersecurity degree. You can click the link below to learn more about the program.', fullText2: ' ', linkUrl: 'https://www.shawu.edu/archives/2021/shaw_university_has_established_the_center_for_cybersecurity_education_and_research_(c-cer)/', linkText: 'Cyber Security courses details' },
            ];
            setNewsList(fetchedNews);
            setLoading(false);
        }, 1000);
    }, [setLoading]);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const createMailToLink = (newsItem: NewsData) => {
        const subject = encodeURIComponent(`Check out this news from our Computer Science Department: ${newsItem.title}`);
        const body = encodeURIComponent(
            `Hi,\n\nI found this interesting article titled "${newsItem.title}" and thought you might find it interesting:\n\n${newsItem.fullText}\n\nRead more here: ${newsItem.linkUrl}\n\nBest Regards,\n[Your Name]`
        );
        return `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-black">
            <div className="absolute h-screen w-screen flex items-center justify-center z-0">
                <Image
                    src={newsBackground}
                    alt="News background"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>
            <div className="w-full max-w-4xl flex flex-col items-center justify-center bg-[#fefefe] rounded-xl z-10 p-8">
                <h1 className="text-3xl sm:text-4xl text-[#8c2333] font-sans font-bold mb-6">Computer Science News</h1>
                <div className="flex flex-col items-center justify-center gap-6">
                    {newsList.map(newsItem => (
                        <div key={newsItem.id} className="w-full">
                            <div
                                className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 cursor-pointer"
                                onClick={() => toggleExpand(newsItem.id)}
                            >
                                <h2 className="text-xl font-bold text-[#333]">{newsItem.title}</h2>
                                <p className="text-[#666]">{newsItem.summary}</p>
                            </div>
                            {expandedId === newsItem.id && (
                                <div className="mt-4 bg-gray-100 rounded-b-lg p-4">
                                    <p className="text-[#666]">{newsItem.fullText}</p>
                                    <a href={newsItem.linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {newsItem.linkText}
                                    </a>
                                    <div className="mt-4">
                                        <Image
                                            src={newsItem.imageUrl}
                                            alt={newsItem.title}
                                            width={400}
                                            height={250}
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <a href={createMailToLink(newsItem)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Share via Email
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
