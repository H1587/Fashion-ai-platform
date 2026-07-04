/*
  Warnings:

  - A unique constraint covering the columns `[specificationId]` on the table `TechPack` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TechPack_specificationId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "TechPack_specificationId_key" ON "TechPack"("specificationId");
