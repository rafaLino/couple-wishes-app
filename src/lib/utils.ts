import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LoginResponse } from "./api"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function saveOnLocalStorageAsync(data: Pick<LoginResponse, "token" | "user">) {
  return new Promise((resolve) => {
    localStorage.setItem('access_token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    resolve(true)
  })
}

export function clearLocalStorageAsync() {
  return new Promise((resolve) => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    resolve(true)
  })
}