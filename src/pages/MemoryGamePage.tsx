import { FC, useEffect, useState } from 'react';
import { BackButton } from '../components/BackButton';
import _ from 'lodash';

// 1. Multiply images into 2 and shuffle them
// 2. Render images in a grid
// 3. On click, show the image
// 4. If the second image is the same, keep them open
// 5. If not, hide them again
// 6. Bonus: Add Animations and shadows
// 7. Bonus: Add a timer and count the time it took to finish the game

const imageSet = [
    "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
    "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
    "https://images.unsplash.com/photo-1520763185298-1b434c919102",
    "https://images.unsplash.com/photo-1442458017215-285b83f65851",
    "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
    "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
];

const shuffleArray = (array: string[]) => {
    return _.shuffle(array);
};

export const MemoryGamePage: FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
    const [matchedIndexes, setMatchedIndexes] = useState<number[]>([]);

    useEffect(() => {
        const images2x = [...imageSet, ...imageSet];
        setImages(shuffleArray(images2x));
    }, []);

    const handleCardClick = (index: number) => {
        if (flippedIndexes.length === 2 || flippedIndexes.includes(index) || matchedIndexes.includes(index)) return;

        const newFlipped = [...flippedIndexes, index];
        setFlippedIndexes(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (images[first] === images[second]) {
                setMatchedIndexes([...matchedIndexes, first, second]);
            }
            setTimeout(() => setFlippedIndexes([]), 1000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Memory game</h1>
                    <div className="grid grid-cols-4 gap-8">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`relative w-40 h-40 sm:w-52 sm:h-52 bg-gray-300 cursor-pointer rounded-lg overflow-hidden ${flippedIndexes.includes(index) || matchedIndexes.includes(index) ? "shadow-xl" : "hover:bg-blue-500"
                                    }`}
                                onClick={() => handleCardClick(index)}
                            >
                                {(flippedIndexes.includes(index) || matchedIndexes.includes(index)) ? (
                                    <img src={image} alt="card" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-300"></div>
                                )}
                            </div>
                        ))}
                    </div>
                    {matchedIndexes.length === images.length && <h2 className="text-2xl font-bold mt-4">You Win! 🎉</h2>}
                </div>
            </div>
        </div>
    );
};
