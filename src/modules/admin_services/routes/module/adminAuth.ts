import { Router, Request, Response } from 'express';
import { signIn } from '../../controllers/AdminAuthController';

const adminAuthModule = (router: Router) => {
    router.post('/sign-in', signIn)
}

export default adminAuthModule