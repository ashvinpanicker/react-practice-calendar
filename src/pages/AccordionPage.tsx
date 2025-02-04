import React from 'react';
import { BackButton } from '../components/BackButton';
import Accordion from '../components/Accordion';

const accordionData = [
    {
        title: "What is Github and how does it work?",
        content:
            "GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages. If you're just getting started with GitHub, you may know us best as a place for version control and collaboration.",
    },
    {
        title: "How do I see GitHub's availability?",
        content: "Check our real-time status report",
    },
    {
        title: "Why is GitHub so popular?",
        content:
            "GitHub is built by developers for developers, and we're proud to be home to the world's largest open source community. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.",
    },
];

// 1. Create single accordion component
// 2. map over accordionData and render multiple accordions 
// 3. Bonus question: How would you implement the accordion to open only one at a time?


export const AccordionPage: React.FC = () => {
    
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Accordion Demo</h1>
                    <div className="space-y-4">
                        {accordionData.map((item, index) => (
                            <Accordion key={index} title={item.title} desc={item.content} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};