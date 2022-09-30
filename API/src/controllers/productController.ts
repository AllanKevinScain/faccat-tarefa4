import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
export default {
  creatProduct: async (req: Request, res: Response) => {
    try {
      const { displayName } = req.body;
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) return res.json({ error: 'Esse usuário não existe!' });

      const product = await prisma.product.create({
        data: {
          displayName,
          userId: user.id,
        },
        include: {
          author: true,
        },
      });

      return res.json(product);
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  findAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await prisma.product.findMany();
      console.log('🚀', products);
      return res.json(products);
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  updateProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { displayName } = req.body;

      let product = await prisma.product.findUnique({ where: { id: Number(id) } });
      if (!product) return res.json({ error: 'Nenhum produto encontrado!' });

      product = await prisma.product.update({ where: { id: Number(id) }, data: { displayName } });
      console.log('🚀 Usuário Atualizado!');
      return res.json(product);
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (id) {
        const product = await prisma.product.delete({ where: { id: Number(id) } });
        console.log('🚀 Produto deletado', id);

        return res.json(product);
      }

      return res.json({ error: 'Nenhum produto especificado!' });
    } catch (error) {
      console.log('🚀', error);
      return res.status(400).end();
    } finally {
      async () => {
        await prisma.$disconnect();
      };
    }
  },
  deleteAllProducts: async (req: Request, res: Response) => {
    try {
      const product = await prisma.product.deleteMany();
      return res.json(product);
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
