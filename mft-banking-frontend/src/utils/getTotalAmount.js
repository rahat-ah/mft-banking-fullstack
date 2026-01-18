export const getTotalDueAmount = (customer) => {
  if (!customer || !Array.isArray(customer.due)) return 0;

  return customer.due.reduce(
    (total, item) => total + (item.dueAmount || 0),
    0
  );
};

export const getTotalPaymentAmount = (customer) => {
  if (!customer || !Array.isArray(customer.payments)) return 0;

  return customer.payments.reduce(
    (total, item) => total + (item.amount || 0),
    0
  );
};
