-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'REVIEWING', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReportTargetType" AS ENUM ('RESOURCE', 'COMMENT', 'USER');

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reporterUserId" TEXT NOT NULL,
    "targetType" "ReportTargetType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "description" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "resolvedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterUserId_fkey" FOREIGN KEY ("reporterUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_resolvedByUserId_fkey" FOREIGN KEY ("resolvedByUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
