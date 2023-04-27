import { PrismaClient } from '@prisma/client';
import { boards } from './data';

const prisma = new PrismaClient();

async function main() {
   try {
      await prisma.board.deleteMany({});
   } catch (error) {
      console.log('no delete');
   }

   console.log('Seeding...');

   // Call createAllBoards function to create all board objects
   const createdBoards = await createAllBoards();

   console.log(createdBoards);
}

main()
   .catch((e) => console.error(e))
   .finally(async () => {
      await prisma.$disconnect();
   });

async function createAllBoards() {
   const boardObjects = [];

   for (const boardData of boards) {
      const boardObject = await createBoard(boardData);
      boardObjects.push(boardObject);
   }

   return boardObjects;
}

async function createBoard(boardData: any) {
   return await prisma.board.create({
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
         name: boardData.name,
         columns: {
            create: boardData.columns.map((column: any) => ({
               name: column.name,
               tasks: {
                  create: column.tasks.map((task: any) => ({
                     title: task.title,
                     description: task.description,
                     status: task.status,
                     subtasks: {
                        create: task.subtasks.map((subtask: any) => ({
                           title: subtask.title,
                           isComplete: subtask.isCompleted,
                        })),
                     },
                  })),
               },
            })),
         },
      },
   });
}
