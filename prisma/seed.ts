import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
   await prisma.board.deleteMany();

   console.log('Seeding...');

   const board1 = await prisma.board.create({
      include: {
         columns: {
            include: {
               tasks: {
                  include: {
                     subtasks: true,
                  },
               },
            },
         },
      },
      data: {
         name: 'Platform Launch',
         columns: {
            create: [
               {
                  name: 'TODO',
                  tasks: {
                     create: [
                        {
                           title: 'Build UI for onboarding flow',
                           description: '',
                           status: 'TODO',
                           subtasks: {
                              create: [
                                 {
                                    title: 'Sign up page',
                                    isComplete: true,
                                 },
                                 {
                                    title: 'Sign in page',
                                 },
                                 {
                                    title: 'Welcome page',
                                 },
                              ],
                           },
                        },
                     ],
                  },
               },
            ],
         },
      },
   });

   console.log({ board1 });
}

main()
   .catch((e) => console.error(e))
   .finally(async () => {
      await prisma.$disconnect();
   });
