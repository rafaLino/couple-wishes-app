import { User } from "@/entities/user";
import { atom } from "jotai";


export const DialogUserAtom = atom<User | undefined>(undefined)


