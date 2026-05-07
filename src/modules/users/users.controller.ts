import { Controller, Get, UseGuards} from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { RolesGuard } from '../../common/guards/roles.guard';

import { CurrentUser } from '../../common/decorators/current-user.decorator';

import { Roles } from '../../common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: any) {
    return user;
  }

  @Roles('ADMIN')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Get('admin')
  adminRoute() {
    return {
      message:
        'Você é ADMIN',
    };
  }
}