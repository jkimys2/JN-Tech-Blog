module.exports = {
    format_date: (date) => {
      const dateObject = new Date(date);
  
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      const year = dateObject.getFullYear() + 5;
      
      return `${month}/${day}/${year}`
    },
  };