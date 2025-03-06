/*

Build a React component that allows users to book a table at a restaurant.
Users should be able to choose the number of persons they want to book for, the date and the time.

Here is the user flow to guide your work:

initially, show just a button with the text "Book a table"
on click, a dialog opens for the user to choose the date, time and number of persons
when the user clicks "Book", he can enter his name and phone number and confirm the reservation;
at the end of the flow, since we don't have a backend endpoint to POST the information to, you can just console.log the booking details

*/

import { FC, useState } from 'react';
import { BackButton } from '../components/BackButton';
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import dayjs from 'dayjs';
import PeopleCountInput from '../components/PeopleCountInput';

export const ReservationPage: FC = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [isPage2, setPage2] = useState(false);
    const [isPeopleCountOpen, setPeopleCountOpen] = useState(false);
    const [persons, setPersons] = useState(1);
    
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleConfirmReservation = () => { 
        setPage2(false);
        setShowDialog(false); 
        console.log(`Reservation confirmed for ${persons} person${persons > 1 ? 's' : ''} on ${dayjs(date).format('DD/MM/YYYY')} at ${time}. Contact details: ${name} - ${phone}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Restaurant Reservation</h1>
                    <div className="flex flex-col">
                        {showDialog ?
                            <Dialog open={showDialog} onClose={() => setShowDialog(false)} className="relative z-50">
                                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                                {isPage2 ?
                                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                                            <DialogTitle className="font-bold">Contact details</DialogTitle>
                                            <div className="flex flex-col space-y-4">
                                                <div className='flex flex-row space-x-4 bg-blue-100 p-4 rounded items-center'>
                                                    <p className="text-sm">You are making a reservation for <b>{persons} person{persons > 1 && 's'}</b>, on <b>{dayjs(date).format('DD/MM/YYYY')}</b> at <b>{time}</b></p>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <label htmlFor="name" className="text-sm">Name</label>
                                                    <input name="name" type="text" className="p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <label htmlFor="phone" className="text-sm">Phone number</label>
                                                    <input name="phone" type="tel" className="p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                                <button className="bg-blue-500 text-white rounded p-2" onClick={handleConfirmReservation}>Confirm reservation</button>
                                            </div>
                                        </DialogPanel>
                                    </div>
                                    :
                                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                                            <DialogTitle className="font-bold">Book a table</DialogTitle>
                                            <Description>This is where you'll add the details of your booking</Description>
                                            <div className="flex flex-col space-y-4">
                                                <div className='flex flex-row space-x-4 bg-blue-200 p-4 rounded items-center'>
                                                    <label htmlFor="persons" className="text-sm italic">People</label>
                                                    <PeopleCountInput isOpen={isPeopleCountOpen} setIsOpen={setPeopleCountOpen} setPeopleCount={setPersons} />
                                                </div>
                                                <div className='flex flex-row space-x-4 bg-blue-200 p-4 rounded items-center'>
                                                    <label htmlFor="date" className="text-sm italic">Date</label>
                                                    <input name="date" type="date" className="p-2 border rounded" value={date} onChange={(e) => setDate(e.target.value)} />
                                                </div>
                                                <div className='flex flex-row space-x-4 bg-blue-200 p-4 rounded items-center'>
                                                    <label htmlFor="time" className="text-sm italic">Time</label>
                                                    <input type="time" className="p-2 border rounded" value={time} onChange={(e) => setTime(e.target.value)} />
                                                </div>

                                                <button className="bg-blue-500 text-white rounded p-2" onClick={() => { setPage2(true); }}>Book Now</button>
                                            </div>
                                        </DialogPanel>
                                    </div>
                                }
                            </Dialog> : <button onClick={() => setShowDialog(true)} className="bg-blue-500 text-white p-2 rounded">Book a table</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};
