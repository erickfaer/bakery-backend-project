import { Buy, PrismaClient, Sell } from "@prisma/client";
import { ICreateBuyInfoDTO, ICreateSellInfoDTO } from "../dtos/IFinancialDTO";

class FinancialRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async saveSell({ amount, date, time, productId }: ICreateSellInfoDTO): Promise<Sell> {
    const newSell = await this.prisma.sell.create({
      data: {
        amount,
        date,
        time,
        productId
      }
    })

    return newSell;
  }

  async saveBuy({ date, time, ingredientId }: ICreateBuyInfoDTO): Promise<Buy> {
    const newBuy = await this.prisma.buy.create({
      data: {
        date,
        time,
        ingredientId
      }
    })

    return newBuy;
  }

  async findSellInfoByDate({ date }: Sell): Promise<Sell[]> {
    const sellData = await this.prisma.sell.findMany({
      where: {
        date: {
          equals: date
        }
      }
    })

    return sellData;
  }

  async findBuyInfoByDate({ date }: Buy): Promise<Buy[]> {
    const buyData = await this.prisma.buy.findMany({
      where: {
        date: {
          equals: date
        }
      }
    })

    return buyData;
  }
}

export { FinancialRepository };