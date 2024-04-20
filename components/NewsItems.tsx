import React from 'react';
import Image from 'next/image';

type Props = {
    data: {
        id: number;
        title: string;
        summary: string;
        imageUrl: string;
        fullText: string;
        linkUrl: string;
        linkText: string;
    };
    onClick: () => void;
    isExpanded: boolean;
};

const NewsItems: React.FC<Props> = ({ data, onClick, isExpanded }) => {
    return (
        <div className="w-full">
            <div className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
                <h2 className="text-xl font-bold text-[#333]">{data.title}</h2>
                <p className="text-[#666]">{data.summary}</p>
            </div>
            {isExpanded && (
                <div className="mt-4 bg-gray-100 rounded-b-lg p-4">
                    <p className="text-[#666]">{data.fullText}</p>
                    <a href={data.linkUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {data.linkText}
                    </a>
                    <div className="mt-4">
                        <Image
                            src={data.imageUrl}
                            alt={data.title}
                            width={400}
                            height={250}
                            objectFit="cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsItems;
