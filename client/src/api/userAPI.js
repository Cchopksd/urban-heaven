export const URL_REFRESH_TOKEN = `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`;
export const URL_LOGIN = `${import.meta.env.VITE_BASE_URL}/login`;
export const URL_GET_USER_DATA = `${import.meta.env.VITE_BASE_URL}/get-single-user`;
export const URL_GET_USER_AGREEMENT = `${import.meta.env.VITE_BASE_URL}/get-user-agreement`;
export const URL_GET_USER_ADDRESS = `${import.meta.env.VITE_BASE_URL}/get-user-address`;
export const URL_GET_AUTH_DATA = `${import.meta.env.VITE_BASE_URL}/auth/get-auth-data`;
export const URL_RESET_PASSWORD = `${import.meta.env.VITE_BASE_URL}/edit-pass`;
export const URL_ACCEPT_AGREEMENT = `${import.meta.env.VITE_BASE_URL}/accept-agreement-vendor`;
export const URL_VERIFY_EMAIL = `${import.meta.env.VITE_BASE_URL}/verify-email`;
export const URL_SEND_EMAIL_VERIFY = `${import.meta.env.VITE_BASE_URL}/email-validation`;
export const URL_EDIT_ACCOUNT_DETAILS = `${import.meta.env.VITE_BASE_URL}/edit-profile`;
export const URL_GET_PROVINCE = `${import.meta.env.VITE_BASE_URL}/province`;
export const URL_GET_DISTRICT = (id) => `${import.meta.env.VITE_BASE_URL}/province/${id}/district`;
export const URL_GET_SUBDISTRICT = (id) => `${import.meta.env.VITE_BASE_URL}/district/${id}/subdistrict`;
export const URL_CREATE_ADDRESS = `${import.meta.env.VITE_BASE_URL}/create-address`;
