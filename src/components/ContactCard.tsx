import React from 'react';
import { Contact } from '../types/Contact';

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{contact.name}</p>
        <p className="text-sm text-gray-500">
          {contact.countryCode} {contact.phoneNumber}
        </p>
      </div>
      <time className="text-xs text-gray-400">
        {new Date(contact.timestamp).toLocaleDateString()}
      </time>
    </div>
  );
}