// Capitalize first word
export const titleCase = (str) => {
    return str.toLowerCase()
                .split(' ')
                .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                .join('+');
    };

export const celsiusConverter = (temp) => {
    return Math.round(temp - 273.15);
};

export const fahrConverter = (temp) => {
    return Math.round(((temp - 273.15) * 1.8) + 32);
};

export const convertObjToArray = (data, arr) => {
    for (const [ key, value ] of Object.entries(data)) { 
        arr.push({ [key]: value });
    }
};

export const currentTime = (timezone) => {
    // UTC varibales
    const date = new Date();
    const secondsLeftFromUTCHours = date.getUTCHours() * 60 * 60;
    const secondsLeftFromUTCMinutes = date.getUTCMinutes() * 60;
    const secondsLeftFromUTC = date.getUTCSeconds();

    // Totals variables
    const totalCurrentUTCSeconds = secondsLeftFromUTCHours + secondsLeftFromUTCMinutes + secondsLeftFromUTC;
    const getCurrentTimezoneSeconds = totalCurrentUTCSeconds + timezone; // timezone apssed from API is already a negative number so it needs to be added in order to subtract it in this specific case

    // Conditionals to check seconds in day
    if (getCurrentTimezoneSeconds < 0) {
        // Since the seconds leftover is less than zero we need to use the total seconds in a day to get what's left over
        const totalSecondsInDay = 86400;
        let leftOverSeconds = totalSecondsInDay - getCurrentTimezoneSeconds;

        const getCurrentHours = leftOverSeconds - Math.floor((leftOverSeconds / 60) / 60);
        leftOverSeconds = leftOverSeconds - (getCurrentHours * 60) * 60;

        const getCurrentMinutes = Math.floor(leftOverSeconds / 60);
        leftOverSeconds = leftOverSeconds - (getCurrentMinutes * 60);

        const getCurrentSeconds = leftOverSeconds;

        return `${getCurrentHours}:${getCurrentMinutes}:${getCurrentSeconds}`;
        
    } 
    
    else {
        let leftOverSeconds = getCurrentTimezoneSeconds;

        const getCurrentHours = Math.floor((leftOverSeconds / 60) / 60);
        leftOverSeconds = leftOverSeconds - (getCurrentHours * 60) * 60;

        const getCurrentMinutes = Math.floor(leftOverSeconds / 60);
        leftOverSeconds = leftOverSeconds - (getCurrentMinutes * 60);

        const getCurrentSeconds = leftOverSeconds;

        return `${getCurrentHours}:${getCurrentMinutes}:${getCurrentSeconds}`;
    }
};