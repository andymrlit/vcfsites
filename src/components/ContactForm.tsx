import React, { useState } from 'react';
import { Phone, User } from 'lucide-react';
import { useContactStore } from '../store/useContactStore';
import { ContactList } from './ContactList';
import { useCountryCode } from '../hooks/useCountryCode';
import { validatePhoneNumber, validateName } from '../utils/validation';

export function ContactForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const { countryCode, loading } = useCountryCode();
  const { contacts, addContact } = useContactStore();

  const validateForm = (): boolean => {
    const newErrors = { name: '', phone: '' };
    let isValid = true;

    if (!validateName(name)) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phoneNumber: phoneNumber.replace(/[\s-]/g, ''),
      countryCode,
      timestamp: Date.now(),
    };

    addContact(newContact);
    setName('');
    setPhoneNumber('');
    setErrors({ name: '', phone: '' });
  };

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <User className="w-6 h-6 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-800">Contact Form</h2>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
              {countryCode}
            </span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.phone ? 'border-red-500' : ''
              }`}
              placeholder="123456789"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Phone className="w-4 h-4 mr-2" />
          Add Contact
        </button>
      </form>

      <ContactList contacts={contacts} />
    </div>
  );
}