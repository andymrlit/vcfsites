import { create } from 'zustand';
import { Contact } from '../types/Contact';

interface ContactStore {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],
  addContact: (contact) =>
    set((state) => ({
      contacts: [...state.contacts, contact],
    })),
}));