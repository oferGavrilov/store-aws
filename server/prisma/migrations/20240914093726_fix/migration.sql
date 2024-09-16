/*
  Warnings:

  - You are about to drop the column `projectManageUserId` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "projectManageUserId",
ADD COLUMN     "projectManagerUserId" INTEGER;
