import { Router, Request, Response } from 'express';
import { signIn, signUp } from '../../controllers/AdminAuthController';

const adminAuthModule = (router: Router) => {
    router.post('/sign-in', signIn)
    router.post('/sign-up', signUp)
}

export default adminAuthModule