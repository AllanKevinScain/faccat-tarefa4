import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default {
  creatUser: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      let user = await prisma.user.findUnique({ where: { email } });

      if (user) return res.json({ error: 'Este email já foi registrado!' });
      if (!name || !email || !password) return res.json({ error: 'Algum campo não foi passado!' });

      user = await prisma.user.create({
        data: { name, email, password },
      });

      return res.json(user);
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  findAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      console.log('🚀', users);
      return res.json(users);
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  findUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: 'Nenhum usuário encontrado!' });

      console.log('🚀', user);
      return res.json(user);
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      let user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) return res.json({ error: 'Nenhum usuário encontrado!' });

      user = await prisma.user.update({ where: { id: Number(id) }, data: { name, email, password } });
      console.log('🚀 Usuário Atualizado!');
      return res.json(user);
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: 'Nenhum usuário encontrado!' });

      await prisma.user.delete({ where: { id: user.id } });

      console.log('🚀 Usuário deletado!');
      return res.json(user);
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const userLogin = await prisma.user.findMany({
        where: { email, password },
        select: { name: true },
      });
      const data = userLogin[0];
      if (data) {
        return res.json({ success: `Usuário ${data.name} logado!` });
      }

      return res.json({ error: 'Dados incorretos!' });
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
};
