import sendRequest from "./send-request";
const BASE_URL = '/api/bookings';

export async function addToCart(qty, cakeId) {
    return sendRequest(`${BASE_URL}`, 'PUT', {qty, cakeId});
}