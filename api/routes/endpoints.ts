export const ENDPOINTS = {
    LOGIN : '/auth/login',
    ADD_USER: '/users',
    GET_ALL_USER : '/users',
    GET_SINGLE_USER : (id: string) =>`/users/${id}`,
    UPDATE_USER : (id: string) =>`/users/${id}`,
    DELETE_USER : (id: string) =>  `/users/${id}`,
    ADD_PRODUCT : '/products',
    GET_ALL_PRODUCT : '/products',
    UPDATE_PRODUCT : (id: Number) => `/products/${id}`

}