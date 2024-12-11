export const validatePhoneNumber = (phone: string): boolean => {
  // Basic phone number validation: allows digits, spaces, and dashes
  const phoneRegex = /^[\d\s-]+$/;
  return phoneRegex.test(phone) && phone.replace(/[\s-]/g, '').length >= 6;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};