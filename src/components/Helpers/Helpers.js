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

export const convertObjToArray = () => {
    
};