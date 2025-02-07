import { FC, useEffect, useState } from 'react';
import { BackButton } from '../components/BackButton';
import Spinner from '../components/Spinner';

// 1. Fetch top 10 story IDs from Hacker News API
// 2. Fetch each story by ID
// 3. Save the stories in a state
// 4. Render the stories in a list

type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

const hackerNewsTop10API = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=10`;

export const HackerNewsPage: FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStories = async () => {
            setLoading(true);
            try {
                const response = await fetch(hackerNewsTop10API);
                const data = await response.json();
                const storyPromises = data.map(async (id: number) => {
                    const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                    return storyResponse.json();
                });
                const storiesData = await Promise.all(storyPromises);
                setStories(storiesData);
            } catch (error) {
                console.error("Error fetching stories:", error);
            }
            setLoading(false);
        }
        fetchStories();
    }, []);

    
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Top 10 Hacker News Stories</h1>
                    <div>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <ul className="list-disc pl-6">
                                {stories.map((story) => (
                                    <li key={story.id} className="mb-2">
                                        <a href={story.url} className="text-blue-600">{story.title}</a>
                                        <p>{story.score} by <b>{story.by}</b></p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
