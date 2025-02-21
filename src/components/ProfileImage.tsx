import Image from "next/image";
import React from "react";

export default function ProfileImage({path, alt, isActive, onClick}: {
    path: string;
    alt: string;
    isActive: boolean;
    onClick?: () => void;
}) {
    return (
        <div className="relative w-32 h-32" onClick={onClick}>
            <Image
                src={path}
                alt={alt}
                sizes="auto"
                fill
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
                className={`rounded-full ${isActive ? 'border-4 border-white' : 'border-2 border-gray-600'} 
                    hover:cursor-pointer hover:opacity-50`}
            />
        </div>
    );
}
