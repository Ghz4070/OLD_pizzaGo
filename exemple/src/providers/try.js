import {prisma} from './generated/prisma-client';

export function getAllUser(){
    return new Promise(async (next) => {
        next(await prisma.posts());
    })
}