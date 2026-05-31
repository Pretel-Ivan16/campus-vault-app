/* 
  Advertencias:

  - Se agregará una restricción única que cubre las columnas `[facultyId,slug]` en la tabla `Career`. Si existen valores duplicados, esto fallará.
  - Se agregará una restricción única que cubre las columnas `[instituteId,slug]` en la tabla `Career`. Si existen valores duplicados, esto fallará.
  - Se agregará una restricción única que cubre las columnas `[universityId,slug]` en la tabla `Faculty`. Si existen valores duplicados, esto fallará.
  - Se agregará una restricción única que cubre las columnas `[universityId,slug]` en la tabla `Institute`. Si existen valores duplicados, esto fallará.
  - Se agregará una restricción única que cubre las columnas `[careerId,slug]` en la tabla `Subject`. Si existen valores duplicados, esto fallará.
  - Se añadió la columna obligatoria `parentType` a la tabla `Career` sin un valor por defecto. Esto no es posible si la tabla no está vacía.
 */

-- CreateEnum
CREATE TYPE "ParentType" AS ENUM ('FACULTY', 'INSTITUTE');

-- AlterTable
ALTER TABLE "Career" ADD COLUMN     "parentType" "ParentType" NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Career_facultyId_slug_key" ON "Career"("facultyId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Career_instituteId_slug_key" ON "Career"("instituteId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_universityId_slug_key" ON "Faculty"("universityId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_universityId_slug_key" ON "Institute"("universityId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_careerId_slug_key" ON "Subject"("careerId", "slug");

-- Add CHECK constraint para asegurar que cada carrera tenga exactamente un padre (facultad o instituto, nunca ambos, nunca ninguno)
ALTER TABLE "Career" ADD CONSTRAINT "career_exactly_one_parent"
CHECK (
  ("facultyId" IS NOT NULL AND "instituteId" IS NULL)
  OR
  ("facultyId" IS NULL AND "instituteId" IS NOT NULL)
);
