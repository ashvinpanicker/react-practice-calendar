import { FC } from 'react';
import { BackButton } from '../components/BackButton';

import AuthorFilter from "../components/AuthorFilter";
import LabelFilter from "../components/LabelFilter";
import MilestoneFilter from "../components/MilestoneFilter";

export const GithubIssueFilterPage: FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Github Issue Filter</h1>
                    <div className="flex gap-10 flex-row-reverse">
                        <MilestoneFilter />
                        <LabelFilter />
                        <AuthorFilter />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 m-5">

            </div>
        </div >
    );
}
