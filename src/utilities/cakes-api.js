import sendRequest from "./send-request";
const BASE_URL = '/api/cakes';

export async function getAll() {
  return sendRequest(BASE_URL);
}

export async function getOne(nickname) {
    return sendRequest(`${BASE_URL}/${nickname}`);
  }