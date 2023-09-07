function createdDate() {
  const date = new Date();
  date.setMonth(date.getMonth());
  date.setDate(date.getDate());
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
  });
}

module.exports = createdDate;
