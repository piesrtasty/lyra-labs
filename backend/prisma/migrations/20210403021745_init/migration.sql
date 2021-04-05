-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "publicEthAddress" TEXT,
    "lastLoginAt" INTEGER,
    "walletAddress" TEXT,
    "showOnboarding" BOOLEAN DEFAULT true,
    "walletIsSetup" BOOLEAN DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "name" TEXT,
    "name_lower" TEXT,
    "username" TEXT,
    "username_lower" TEXT,
    "headline" TEXT,
    "avatar" TEXT,
    "auth0id" TEXT,
    "identity" TEXT,
    "privateKey" TEXT,
    "address" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "author" TEXT,
    "date" TEXT,
    "description" TEXT,
    "image" TEXT,
    "logo" TEXT,
    "publisher" TEXT,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "submitterId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.issuer_unique" ON "User"("issuer");

-- CreateIndex
CREATE UNIQUE INDEX "User.walletAddress_unique" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_lower_unique" ON "User"("username_lower");

-- CreateIndex
CREATE UNIQUE INDEX "User.auth0id_unique" ON "User"("auth0id");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("submitterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
