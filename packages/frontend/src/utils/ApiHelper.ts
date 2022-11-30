const LIVE = 'https://metawise-dojo-backend.vercel.app/api/v1/'

const STAGE = 'http://localhost:5676/api/v1/'

const BASE_URL = LIVE

export const CONFIG = {
    getAuth: BASE_URL + 'get-oauth-url',
    addBands: BASE_URL + 'session/add-bands',
    addEEG: BASE_URL + 'session/add-eegs',
    addSession: BASE_URL + 'sessions/add',
}