/*

Create a simple Contact Book app that allows users to manage a collection of friends’ contact details.

For each Person, the user should be able to save the name and city where they live.
All contact details should be displayed on one page, as person “cards”.

Next to each person, show two buttons:

an “Edit” button; when clicked, only that Person becomes editable
a “Delete” button, which will delete the contact
Users should only be allowed to edit one contact at a time.

*/

import { FC, useEffect, useState } from 'react';
import { BackButton } from '../components/BackButton';
import { Pencil, Save, Trash } from 'lucide-react';

type Contact = {
    name: string;
    city: string;
}

export const ContactBookPage: FC = () => {
    const emptyContact = { name: '', city: '' };
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [editing, setEditing] = useState<number | null>(null);
    const [newContact, setNewContact] = useState<Contact>(emptyContact);
    const [editContact, setEditContact] = useState<Contact>(emptyContact);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load contacts from local storage when the component mounts
    useEffect(() => {
        const storedContacts = localStorage.getItem('contacts');
        if (storedContacts) {
            setContacts(JSON.parse(storedContacts));
        }
        setIsLoaded(true);
    }, []);

    // Save contacts to local storage whenever they are updated
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
    }, [contacts, isLoaded]);

    const handleAddContact = () => {
        if (newContact.name.trim() === '' || newContact.city.trim() === '') {
            alert('Both name and city fields are required.');
            return;
        }
        setContacts([...contacts, newContact]);
        setNewContact(emptyContact);
    }

    const handleEditContact = (index: number) => {  
        setEditing(index);
        setEditContact(contacts[index]);
    }

    const handleDeleteContact = (index: number) => {
        setContacts(contacts.filter((_contact, i) => i !== index));
    }

    const handleNewContactForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    }
    
    const handleEditContactForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditContact({ ...editContact, [e.target.name]: e.target.value });
    }

    const handleSaveContact = (index: number) => {
        setContacts(contacts.map((contact, i) => {
            if (i === index) {
                return editContact;
            }
            return contact;
        }));
        setEditing(null);
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Contact Book</h1>
                    <div className="flex flex-col">
                       <div className='flex flex-col border-b-2 pb-4 mb-4'>
                            <h2 className="text-slate-600 text-lg font-bold">Add a new Contact</h2>
                            <form className="mt-2">
                                <input name="name" type="text" className="p-2 mr-2 border rounded" placeholder="Name" onChange={handleNewContactForm} value={newContact.name}/>
                                <input name="city" type="text" className="p-2 mr-2 border rounded" placeholder="City" onChange={handleNewContactForm} value={newContact.city} />
                                <button type="button" className={`bg-blue-500 text-white p-2 rounded`} onClick={handleAddContact}>Add contact</button>
                            </form>
                       </div>
                       <div className='flex flex-col'>
                            {contacts.map((contact, index) => (
                                <div key={index} className='border border-gray-200 grid grid-cols-3 gap-4 p-4'>
                                    <div>
                                         {editing === index ? <input name="name" type="text" className="p-2 mr-2 border rounded" value={editContact.name} onChange={handleEditContactForm} /> : <b>{contact.name}</b>}
                                    </div>
                                    <div>
                                         {editing === index ? <input name="city" type="text" className="p-2 mr-2 border rounded" value={editContact.city} onChange={handleEditContactForm} /> : <p><i>City: </i>{contact.city}</p>}
                                    </div>
                                    <div>
                                    {editing === index ? 
                                        <button onClick={() => handleSaveContact(index)}>
                                        <Save className="text-blue-500 mr-2"/>
                                    </button>
                                    :
                                        <button onClick={() => handleEditContact(index)}>
                                            <Pencil className="text-blue-500 mr-2"/>
                                        </button>
}
                                        <button onClick={() => handleDeleteContact(index)}>
                                            <Trash className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
