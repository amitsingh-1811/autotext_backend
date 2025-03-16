-- CreateTable
CREATE TABLE "MathOperation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "operand1" REAL,
    "operand2" REAL,
    "count" INTEGER,
    "result" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
