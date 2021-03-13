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

export const currentTime = (timezoneOffset) => {
    // UTC variables
    const date = new Date();
    const secondsLeftFromUTCHours = date.getUTCHours() * 60 * 60;
    const secondsLeftFromUTCMinutes = date.getUTCMinutes() * 60;
    const secondsLeftFromUTC = date.getUTCSeconds();

    // Totals variables
    const totalCurrentUTCSeconds = secondsLeftFromUTCHours + secondsLeftFromUTCMinutes + secondsLeftFromUTC;
    const totalCurrentTimezoneSeconds = totalCurrentUTCSeconds + timezoneOffset; // timezone passed from API is already a negative number so it needs to be added in order to subtract it in this specific case

    // Add zero function
    const addZero = (val) => {
        return val < 10 ? `0${val}` : val;
    };
    // 24-hour converter function
    const hourConverter = (hour) => {
        return hour > 12 ? hour = hour - 12 : hour;
    };

    // Conditionals to check seconds in day
    if (totalCurrentTimezoneSeconds < 0) {
        // Since the seconds leftover is less than zero we need to use the total seconds in a day to get what's left over
        const totalSecondsInDay = 86400;
        let leftoverSeconds = totalSecondsInDay + totalCurrentTimezoneSeconds; // timezone passed from API is already a negative number so it needs to be added in order to subtract it in this specific case

        const rawHours = Math.floor((leftoverSeconds / 60) / 60);
        leftoverSeconds = leftoverSeconds - (rawHours * 60) * 60;

        const rawMinutes = Math.floor(leftoverSeconds / 60);
        leftoverSeconds = leftoverSeconds - (rawMinutes * 60);

        const hours = hourConverter(addZero(rawHours));
        const minutes = addZero(rawMinutes);
        // const seconds = addZero(leftoverSeconds);

        // return `${hours}:${minutes}:${seconds} ${rawHours < 12 ? `AM` : `PM`}`; // With seconds
        return `${hours}:${minutes} ${rawHours < 12 ? `AM` : `PM`}`; // Without seconds
        
    } 
    
    else {
        let leftoverSeconds = totalCurrentTimezoneSeconds;

        const rawHours = Math.floor((leftoverSeconds / 60) / 60);
        leftoverSeconds = leftoverSeconds - (rawHours * 60) * 60;

        const rawMinutes = Math.floor(leftoverSeconds / 60);
        leftoverSeconds = leftoverSeconds - (rawMinutes * 60);

        const hours = hourConverter(rawHours);
        const minutes = addZero(rawMinutes);
        // const seconds = addZero(leftoverSeconds);

        // return `${hours}:${minutes}:${seconds} ${rawHours < 12 ? `AM` : `PM`}`; // With seconds
        return `${hours}:${minutes} ${rawHours < 12 ? `AM` : `PM`}`; // Without seconds
    }
};

export const weatherIcon = (iconData) => {
    return `http://openweathermap.org/img/wn/${iconData}@2x.png`
};

