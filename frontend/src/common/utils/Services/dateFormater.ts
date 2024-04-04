export const FormatDateString=(dateString: string): string =>{
    const date = new Date(dateString);
    
    // Define arrays for day names and month names
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Extract day, month, and year from the date object
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the date string
    const formattedDate = `${day}, ${date.getDate()} ${month} ${year}`;

    return formattedDate;
}