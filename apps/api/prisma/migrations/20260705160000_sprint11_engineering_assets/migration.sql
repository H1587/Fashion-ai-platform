-- CreateEnum
CREATE TYPE "EngineeringAssetType" AS ENUM (
    'FLAT_SKETCH',
    'TECHNICAL_SKETCH',
    'COLLAR_DETAIL',
    'SLEEVE_DETAIL',
    'POCKET_DETAIL',
    'PLACKET_DETAIL',
    'BUTTON_DETAIL',
    'CONSTRUCTION_ILLUSTRATION',
    'REFERENCE_IMAGE'
);

-- CreateTable
CREATE TABLE "EngineeringAsset" (
    "id" TEXT NOT NULL,
    "techPackId" TEXT NOT NULL,
    "assetType" "EngineeringAssetType" NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "assetData" JSONB,
    "revision" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EngineeringAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EngineeringAsset_techPackId_idx"
ON "EngineeringAsset"("techPackId");

-- CreateIndex
CREATE INDEX "EngineeringAsset_assetType_idx"
ON "EngineeringAsset"("assetType");

-- AddForeignKey
ALTER TABLE "EngineeringAsset"
ADD CONSTRAINT "EngineeringAsset_techPackId_fkey"
FOREIGN KEY ("techPackId")
REFERENCES "TechPack"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;