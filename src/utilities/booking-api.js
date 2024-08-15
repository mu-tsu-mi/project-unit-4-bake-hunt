import sendRequest from "./send-request";
const BASE_URL = '/api/bookings';

export async function addToCart(qty, cakeId) {
    return sendRequest(`${BASE_URL}/cart`, 'PUT', {qty, cakeId});
}

export async function getCart(userId) {
    return sendRequest(`${BASE_URL}/cart`);
}

export async function updateCart(userId, cart) {
    return sendRequest(`${BASE_URL}/cart`, 'POST', cart);
}

export async function clearCart(userId) {
    return sendRequest(`${BASE_URL}/cart`, 'DELETE');
}

export async function checkoutCart(userId, cart) {
    return sendRequest(`${BASE_URL}/checkout`, 'POST', cart);
}

export async function getOrders(userId) {
    return sendRequest(`${BASE_URL}`);
}