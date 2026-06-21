import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';

import { ConfigService } from '@nestjs/config';

import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaymentsService {

  private stripe: Stripe;

  constructor(
    private config: ConfigService,
    private ordersService: OrdersService,
  ) {

    this.stripe = new Stripe(
      this.config.get<string>('STRIPE_SECRET_KEY')!,
    );
  }

  async createCheckoutSession(
    orderId: string,
    total: number,
  ) {

    const session =
      await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],

        mode: 'payment',

        line_items: [
          {
            price_data: {
              currency: 'brl',

              product_data: {
                name: `Pedido ${orderId}`,
              },

              unit_amount: total * 100,
            },

            quantity: 1,
          },
        ],

        metadata: {
          orderId,
        },

        success_url:
          `${this.config.get('FRONTEND_URL')}/success`,

        cancel_url:
          `${this.config.get('FRONTEND_URL')}/cancel`,
      });

    return {
      url: session.url,
    };
  }
}