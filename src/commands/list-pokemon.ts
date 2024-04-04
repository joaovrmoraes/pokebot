import { prisma } from '@/lib/prisma'

export async function listPokemon({ userId }: { userId: string }) {
  return await prisma.pCPokemon.findMany(
    {
      where: {
        userId
      }
    }
  )
}