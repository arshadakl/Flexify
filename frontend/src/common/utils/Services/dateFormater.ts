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


export const FormatDateTimeString = (dateTimeString: string | any): string => {
    const dateTime = new Date(dateTimeString);
    const currentDate = new Date(); // Current date
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const day = days[dateTime.getDay()];
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();

    let hour = dateTime.getHours();
    const minute = dateTime.getMinutes();

    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format

    const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute} ${amPm}`;
    const formattedDate = `${day}, ${dateTime.getDate()} ${month} ${year}`;

    // Check if the date is today
    const isToday = dateTime.toDateString() === currentDate.toDateString();

    if (isToday) {
        return formattedTime; // Return only time if it's today
    } else {
        return `${formattedDate} `; // Return date and time if it's not today
    }
};
