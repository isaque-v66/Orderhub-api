import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';
import { CreateOrderItemDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(companyId: string, items: CreateOrderItemDto[]) {
  const products = await this.prisma.product.findMany({
    where: {
      id: {
        in: items.map(i => i.productId),
      },
    },
  });

  let total = 0;

  const orderItems = items.map((item) => {
    const product = products.find(
      p => p.id === item.productId,
    );

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    const itemTotal = product.price * item.quantity;

    total += itemTotal;

    return {
      productId: product.id,
      quantity: item.quantity,
      unitPrice: product.price,
      product: {
        connect: {
          id: product.id,
        },
      },
    };
  });

  return this.prisma.order.create({
    data: {
      companyId,
      status: 'PENDING',

      total,

      items: {
        create: orderItems,
      },
    },

    include: {
      items: true,
    },
  });
}

  async updateStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}
