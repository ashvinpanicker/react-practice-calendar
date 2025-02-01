import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// 1. Populate Dropdown with countries API 
// 2. Set active country as Netherlands 
// 3. Fetch public holidays for selected country
// 4. Render public holidays

type Country = {
    isoCode: string;
    name: { text: string; language: string }[];
}

type Holiday = {
    id: string;
    startDate: string;
    endDate: string;
    type: string;
    name: { text: string; language: string }[];
    regionalScope: string;
    temporalScope: string;
    nationwide: boolean;
}

const countriesAPI = "https://openholidaysapi.org/Countries?languageIsoCode=EN";
const holidaysAPI = `https://openholidaysapi.org/PublicHolidays?validFrom=2024-01-01&validTo=2024-12-31&languageIsoCode=EN`;

export const PublicHolidaysPage: React.FC = () => {
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch(countriesAPI);
            const data = await response.json();
            setCountries(data);
            setSelectedCountry("NL");
        }

        fetchCountries();

    }, []);

    // refresh list for new selected country
    useEffect(() => {
        const fetchHolidays = async () => {
            if (!selectedCountry) return;
            const fetchURL = `${holidaysAPI}&countryIsoCode=${selectedCountry}`;
            const response = await fetch(fetchURL);
            const data = await response.json();
            console.log(data);
            setHolidays(data);
        }

        fetchHolidays();

    }, [selectedCountry])

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base"
                >
                    <ArrowLeft size={20} className="flex-shrink-0" />
                    Back to Calendar
                </button>

                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Public Holidays App</h1>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 transition-colors"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country: Country) => (
                            <option key={country.isoCode} value={country.isoCode}>{country.name[0].text}</option>
                        ))}
                    </select>
                    <ul className="mt-4">
                        {holidays.map((holiday: Holiday) => (
                            <li key={holiday.id} className="text-gray-600 text-sm sm:text-base">
                                {new Date(holiday.startDate).toDateString().slice(4, -4)} - <b>{holiday.name[0].text}</b>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};