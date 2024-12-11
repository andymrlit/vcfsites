import VCard from 'vcard-creator';

export const generateVCF = (contacts: Array<{ name: string; phoneNumber: string; countryCode: string }>) => {
  const vcards = contacts.map(contact => {
    const vcard = new VCard();
    const fullNumber = `${contact.countryCode}${contact.phoneNumber}`;
    
    vcard
      .addName(contact.name)
      .addPhoneNumber(fullNumber, 'MOBILE');
    
    return vcard.toString();
  });

  const blob = new Blob([vcards.join('\n')], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'contacts.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};