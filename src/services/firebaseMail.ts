export const sendMail = async (data: Record<string, unknown>) => {
  const url = import.meta.env.VITE_FIREBASE_FUNCTION_URL;
  if (!url) {
    throw new Error('Firebase function URL non définie');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Erreur lors de l\'envoi du mail');
  }
};
