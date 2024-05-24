import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";

export const user_middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.get('Authorization').split(' ')[1];
        
        if(!token) {
            return res.status(401).json({
                success: false, 
                message: 'Unauthorized'
            })
        };

        const verify_token: any = verify(token, 'Devyansh');

        if(!verify_token) {
            return res.status(401).json({
                success: false, 
                message: 'Unauthorized' 
            })
        }

        req.headers['user_id'] = verify_token._id;

        next();
    } catch (error) {
        if(error instanceof TokenExpiredError) {
            return res.status(401).json({
                success: false, 
                message: 'Session Expired'
            })
        } else {
            return res.status(401).json({
                success: false, 
                message: 'Middleware Error'
            })
        }
    }
};
