import { CreateUser, User } from "@/entities/user";
import env from "./env";
import { Wish } from "@/entities/wish";
import { saveOnLocalStorageAsync } from "./utils";

type ApiResponseData<T> = {
    data: T
}

export type LoginResponse = {
    token: string;
    refreshToken: string;
    user: User
}

//#region utilities
const getUrl = (url: string) => `${env.VITE_API}/${url}`

const getAccesToken = () => {
    const access_token = localStorage.getItem('access_token')
    return access_token ? `Bearer ${access_token}` : ''
}

const getHeaders = (authorized: boolean = true) => {
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    if (!authorized) return headers

    headers.append('Authorization', getAccesToken())

    return headers
}

async function doRequest(url: string, args: RequestInit) {
    const response = await fetch(url, args)

    if (response.ok || response.status !== 401) {
        return response
    }

    await refresh();

    //refetch
    args.headers = {
        ...args.headers,
        'Authorization': getAccesToken()
    }
    return fetch(url, args);
}

async function createFetch<T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body?: unknown, authorized?: boolean): Promise<T> {
    const rawResponse = await doRequest(getUrl(endpoint), {
        method,
        headers: getHeaders(authorized),
        body: body ? JSON.stringify(body) : undefined
    })

    if (!rawResponse.ok && rawResponse.status == 401) {
        throw new Error(rawResponse.statusText)
    }
    const apiResponse = (await rawResponse.json()) as ApiResponseData<T>;

    if (!rawResponse.ok) {
        const message = (apiResponse as ApiResponseData<Error>).data.message
        throw new Error(message)
    }

    return apiResponse.data
}
//#endregion

async function refresh(): Promise<void> {
    const response = await fetch(getUrl('users/refresh'), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const apiResponse = await response.json() as ApiResponseData<Omit<LoginResponse, "refreshToken">>

    saveOnLocalStorageAsync(apiResponse.data)
}

async function login(values: { username: string, password: string }): Promise<LoginResponse> {
    return createFetch<LoginResponse>('users/login', 'POST', values, false)
}

// wishes
async function getWishes(): Promise<Wish[]> {
    return createFetch<Wish[]>('wishes')
}

async function getWish(id: number): Promise<Wish> {
    return createFetch(`wishes/${id}`)
}

async function addWish(wish: Wish): Promise<Wish> {
    return createFetch<Wish>('wishes', 'POST', wish)
}

async function addWishByUrl(url: string): Promise<Wish> {
    return createFetch<Wish>('wishes/byurl', 'POST', { url })
}

async function updateWish(wish: Wish) {
    return createFetch<Wish>(`wishes/${wish.id}`, 'PUT', wish)
}

async function deleteWish(id: number) {
    return createFetch(`wishes/${id}`, 'DELETE')
}

// users
async function getUsers(): Promise<User[]> {
    return createFetch<User[]>('users')
}

async function getUser(id: number): Promise<User> {
    return createFetch(`users/${id}`)
}

async function addUser(user: CreateUser): Promise<User> {
    return createFetch<User>('users', 'POST', user)
}

async function updateUser(user: User) {
    return createFetch<User>(`users/${user.id}`, 'PUT', user)
}

async function deleteUser(id: number) {
    return createFetch(`users/${id}`, 'DELETE')
}

async function checkUsername(username: string) {
    return createFetch(`users/checkusername/${username}`)
}

async function updatePassword(password: string) {
    return createFetch(`users/updatepassword`, 'POST', { password })
}

async function addCouple(username: string): Promise<User> {
    return createFetch(`users/couple`, 'POST', { username })
}

async function removeCouple(couple_id: number): Promise<void> {
    return createFetch(`users/couple/${couple_id}`, 'DELETE')
}


export default {
    users: {
        login,
        refresh,
        getUsers,
        getUser,
        addUser,
        updateUser,
        deleteUser,
        checkUsername,
        updatePassword,
        addCouple,
        removeCouple,
    },
    wishes: {
        getWishes,
        getWish,
        addWish,
        addWishByUrl,
        updateWish,
        deleteWish
    }
}