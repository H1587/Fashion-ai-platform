-- CreateTable
CREATE TABLE "RenderedAsset" (
    "id" TEXT NOT NULL,
    "engineeringAssetId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "filename" TEXT,
    "storageLocation" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "promptVersion" TEXT,
    "provider" TEXT,
    "providerModel" TEXT,
    "providerMetadata" JSONB,
    "revision" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RenderedAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RenderedAsset_engineeringAssetId_idx" ON "RenderedAsset"("engineeringAssetId");

-- CreateIndex
CREATE INDEX "RenderedAsset_format_idx" ON "RenderedAsset"("format");

-- AddForeignKey
ALTER TABLE "RenderedAsset" ADD CONSTRAINT "RenderedAsset_engineeringAssetId_fkey" FOREIGN KEY ("engineeringAssetId") REFERENCES "EngineeringAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
