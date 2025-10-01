-- CreateTable
CREATE TABLE "UsersVoted" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hasVoted" BOOLEAN NOT NULL,

    CONSTRAINT "UsersVoted_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersVoted" ADD CONSTRAINT "UsersVoted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
