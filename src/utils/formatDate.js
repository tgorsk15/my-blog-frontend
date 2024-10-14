

export function formatDate(dateString) {
    const date = new Date(dateString);

    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    let formattedDate = date.toLocaleString('en-US', options);
  
    // Add the ordinal suffix to the day
    const day = date.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : (day % 100 - day % 10 !== 10) * day % 10];
    
    // Replace the day number with the day number + ordinal suffix
    formattedDate = formattedDate.replace(/(\d+)/, `$1${suffix}`);
    
    return formattedDate;
}