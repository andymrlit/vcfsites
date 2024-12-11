import React from 'react';
import { ContactForm } from './components/ContactForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ContactForm />
      </div>
    </div>
  );
}

export default App;