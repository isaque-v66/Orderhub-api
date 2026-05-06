import { Injectable } from '@nestjs/common'; // 👈 ADICIONE ISSO
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(companyId: string) {
    return this.prisma.user.findMany({
      where: { companyId },
    });
  }
}
