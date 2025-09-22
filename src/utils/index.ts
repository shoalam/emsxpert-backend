export const formatDate = (date: Date, format: string): string => {
    // Implement date formatting logic here
    return ""; // Placeholder return
};

export const generateToken = (length: number): string => {
    // Implement token generation logic here
    return ""; // Placeholder return
};

export const parseJson = (jsonString: string): any => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error("Invalid JSON string");
    }
};