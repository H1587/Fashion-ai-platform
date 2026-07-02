-- CreateTable
CREATE TABLE "ProductSpecification" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "productName" TEXT,
    "productCategory" TEXT,
    "productType" TEXT,
    "gender" TEXT,
    "primaryColour" TEXT,
    "secondaryColour" TEXT,
    "fabric" TEXT,
    "pattern" TEXT,
    "fit" TEXT,
    "sleeve" TEXT,
    "collar" TEXT,
    "closure" TEXT,
    "pocket" TEXT,
    "season" TEXT,
    "style" TEXT,
    "description" TEXT,
    "keyFeatures" JSONB,
    "manufacturingNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSpecification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProductSpecification_imageId_idx" ON "ProductSpecification"("imageId");

-- CreateIndex
CREATE INDEX "ProductSpecification_analysisId_idx" ON "ProductSpecification"("analysisId");

-- AddForeignKey
ALTER TABLE "ProductSpecification" ADD CONSTRAINT "ProductSpecification_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSpecification" ADD CONSTRAINT "ProductSpecification_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "ImageAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
