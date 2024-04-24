export const FormatDateString=(dateString: string | any): string =>{
    const date = new Date(dateString);
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${day}, ${date.getDate()} ${month} ${year}`;

    return formattedDate;
}