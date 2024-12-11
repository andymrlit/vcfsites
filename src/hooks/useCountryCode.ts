import { useState, useEffect } from 'react';

export function useCountryCode() {
  const [countryCode, setCountryCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch country code');
        return res.json();
      })
      .then(data => {
        setCountryCode(data.country_calling_code || '+1');
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching country code:', err);
        setCountryCode('+1');
        setError('Could not detect country code');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { countryCode, loading, error };
}