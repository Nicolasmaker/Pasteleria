export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(amount);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-CL');
};
