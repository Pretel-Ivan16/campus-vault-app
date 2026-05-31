/*
  Warnings:

  - You are about to drop the column `slug` on the `Subject` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Career_facultyId_slug_key";

-- DropIndex
DROP INDEX "Career_instituteId_slug_key";

-- DropIndex
DROP INDEX "Faculty_universityId_slug_key";

-- DropIndex
DROP INDEX "Institute_universityId_slug_key";

-- DropIndex
DROP INDEX "Subject_careerId_slug_key";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "slug";
