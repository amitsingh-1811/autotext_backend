/*
  Warnings:

  - The primary key for the `MathOperation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MathOperation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "operand1" REAL,
    "operand2" REAL,
    "count" INTEGER,
    "result" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_MathOperation" ("count", "createdAt", "id", "operand1", "operand2", "result", "type") SELECT "count", "createdAt", "id", "operand1", "operand2", "result", "type" FROM "MathOperation";
DROP TABLE "MathOperation";
ALTER TABLE "new_MathOperation" RENAME TO "MathOperation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
