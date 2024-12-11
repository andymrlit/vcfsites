import React from 'react';
import { Download } from 'lucide-react';
import { Contact } from '../types/Contact';
import { ContactCard } from './ContactCard';
import { generateVCF } from '../utils/vcf';

interface ContactListProps {
  contacts: Contact[];
}

export function ContactList({ contacts }: ContactListProps) {
  const handleExportVCF = () => {
    generateVCF(contacts);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Contacts ({contacts.length})</h3>
        {contacts.length > 0 && (
          <button
            onClick={handleExportVCF}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
          >
            <Download className="w-4 h-4 mr-1" />
            Export VCF
          </button>
        )}
      </div>
      <div className="space-y-2">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}