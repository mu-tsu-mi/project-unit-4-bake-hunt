import sendRequest from "./send-request";
const BASE_URL = '/api/bookings';

export async function addToCart(qty, cakeId) {
    return sendRequest(`${BASE_URL}`, 'PUT', {qty, cakeId});
}

export async function getCart(userId) {
    return sendRequest(`${BASE_URL}`);
}

export async function updateCart(userId, cart) {
    return sendRequest(`${BASE_URL}`, 'POST', cart);
}

export async function checkoutCart(userId, cart) {
    return sendRequest(`${BASE_URL}/checkout`, 'POST', cart);
}