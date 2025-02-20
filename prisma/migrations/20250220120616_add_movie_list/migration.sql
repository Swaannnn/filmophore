-- CreateTable
CREATE TABLE "MovieList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "moviesId" TEXT[],

    CONSTRAINT "MovieList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieList" ADD CONSTRAINT "MovieList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
