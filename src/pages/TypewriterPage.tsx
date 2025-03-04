/*

Given a sentence, display it with half a second delay between each character.
Start showing nothing and then display characters one by one until the full sentence is displayed. No style is required.

*/

import { FC, useState } from 'react';
import { BackButton } from '../components/BackButton';

export const TypewriterPage: FC = () => {
    const [inputText, setInputText] = useState("");
    const [sentence, setSentence] = useState<string>("");

    const handleTypewriterSentence = () => {
        let i = 0;
        const timer = setInterval(() => {
            setSentence(inputText.substring(0, i + 1));
            i++;
            if (i === inputText.length) clearInterval(timer);
        }, 500);

        return () => clearInterval(timer);
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Typewriter Effect</h1>
                    <div className="flex flex-col">
                        <div className='flex flex-col border-b-2 pb-4 mb-4'>
                            <form className="mt-2">
                                <input name="city" type="text" className="p-2 mr-2 border rounded" onChange={(e) => setInputText(e.target.value)} value={inputText} />
                                <button type="button" className={`bg-blue-500 text-white p-2 rounded`} onClick={handleTypewriterSentence}>Display with Typewriter Effect</button>
                            </form>
                        </div>
                        <div className='flex flex-col'>
                            {sentence &&
                                <div>
                                    You typed <b>{sentence}</b>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
