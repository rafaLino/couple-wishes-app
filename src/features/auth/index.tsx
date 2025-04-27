import { User } from '@/entities/user';
import { createStore, Provider, useAtomValue, useStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { FC, PropsWithChildren } from 'react';


const authStore = createStore()

const userAtom = atomWithStorage<User | undefined>('user', undefined, undefined, { getOnInit: true })

export type AuthClient = {
    isAuthenticated: () => boolean;
    getUser: () => User | undefined;
    setUser: (user: User) => void;
}

export const useAuth = (): AuthClient => {
    const store = useStore()

    const isAuthenticated = () => {
        return !!store.get(userAtom)
    }

    const getUser = () => {
        return store.get(userAtom)
    }

    const setUser = (user: User) => {
        store.set(userAtom, user)
    }

    return { isAuthenticated, getUser, setUser }
}

export const useAuthUser = () => {
    return useAtomValue(userAtom)
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Provider store={authStore}>
            {children}
        </Provider>
    )
}
