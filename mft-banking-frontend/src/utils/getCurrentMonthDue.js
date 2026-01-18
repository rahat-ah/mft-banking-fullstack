const getCurrentMonthDue = (customer) => {
  if (!customer || !Array.isArray(customer.due)) return 0;

  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM

  const currentDue = customer?.due?.find(
    (item) => item.dueDate.slice(0, 7) === currentMonth
  );

  if (currentDue.dueAmount) {
    return {currentDue:currentDue.dueAmount || 0,
      currentMonthAdvances:0
    };
  }

  const currentMonthAdvances = customer?.advance
    ?.filter((item) => item.date?.slice(0, 7) === currentMonth) || [];

  const totalAdvance = currentMonthAdvances.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );
  
  return {currentdue: 0,
      currentMonthAdvances:totalAdvance || 0
    };
  
};
export default getCurrentMonthDue;
