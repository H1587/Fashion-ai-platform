-- CreateTable
CREATE TABLE "TechPack" (
    "id" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,
    "title" TEXT,
    "technicalDescription" TEXT,
    "constructionDetails" TEXT,
    "fabricDetails" TEXT,
    "trimDetails" TEXT,
    "measurementNotes" TEXT,
    "fitNotes" TEXT,
    "careInstructions" TEXT,
    "packagingInstructions" TEXT,
    "qualityNotes" TEXT,
    "revision" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TechPack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TechPack_specificationId_idx" ON "TechPack"("specificationId");

-- AddForeignKey
ALTER TABLE "TechPack" ADD CONSTRAINT "TechPack_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "ProductSpecification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
