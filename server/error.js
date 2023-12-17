export const createError = (status, message) => {
    const error = new Error(status, message);
    error.status = status; 
    error.message = message;
    return error;
}