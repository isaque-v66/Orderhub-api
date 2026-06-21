import {
  Controller,
  Post,
  Param,
  Req,
  Headers,
  UseGuards,
} from '@nestjs/common';

import Stripe from 'stripe';

import { ConfigService } from '@nestjs/config';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { PaymentsService } from './payments.service';

import { OrdersService } from '../orders/orders.service';

@Controller('payments')
export class PaymentsController {

  private stripe: Stripe;

  constructor(
    private paymentService: PaymentsService,
    private config: ConfigService,
    private ordersService: OrdersService,
  ) {

    this.stripe = new Stripe(
      config.get<string>('STRIPE_SECRET_KEY')!,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout/:orderId')
  async checkout(
    @Param('orderId') orderId: string,
  ) {

    return this.paymentService
      .createCheckoutSession(
        orderId,
        5000,
      );
  }

  @Post('webhook')
    async webhook(
    @Req() req: any,
    @Headers('stripe-signature')
    signature: string,
    ) {
    const event =
        this.stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        this.config.get<string>(
            'STRIPE_WEBHOOK_SECRET',
        )!,
        );

    if (
      event.type ===
      'checkout.session.completed'
    ) {

      const session =
        event.data.object as Stripe.Checkout.Session;

      const orderId =
        session.metadata?.orderId;

      if (orderId) {

        await this.ordersService.updateStatus(
          orderId,
          'PAID' as any,
        );

      }
    }

    return {
      received: true,
    };
  }
}