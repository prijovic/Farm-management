export function getErrorMessage(error: any): string {
    if (error.code === "ERR_NETWORK") {
        return "Server is currently down, please try again later";
    }
    if (error.response && error.response.data && error.response.data.error) {
        return error.response.data.error;
    }
    if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized");
    }
    return "Unknown error occurred";
}
