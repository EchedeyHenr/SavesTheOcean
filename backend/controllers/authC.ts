// controllers/authC.ts
import { Request, Response } from 'express';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '../models/index';
import { envConfig } from '../config/env.config';

export const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
      const user = await db.users.findOne({ where: { email } });
      
      if (!user) throw new Error('Usuario no encontrado');

      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) throw new Error('Contraseña incorrecta');

      const payload: JwtPayload = { 
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname
      };

      const token = jwt.sign(
        payload as object,
        envConfig.jwtSecret as jwt.Secret,
        {
          expiresIn: envConfig.jwtExpiresIn,
          algorithm: 'HS256'
        } as SignOptions
      );

      res.json({ 
        token,
        user: payload
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};