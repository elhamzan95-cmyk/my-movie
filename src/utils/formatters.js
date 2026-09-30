export const formatDate = (dateString, includeTime = true) => {
  try {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  } catch {
    return 'Unknown date';
  }
};

export const formatNumber = (num) => {
  try {
    return num?.toLocaleString('en-US') || '0';
  } catch {
    return num?.toString() || '0';
  }
};