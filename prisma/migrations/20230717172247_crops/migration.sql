-- AlterTable
ALTER TABLE `User` ADD COLUMN `sold` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Crop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `weight` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `producerId` INTEGER NOT NULL,
    `rating` DOUBLE NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sold` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediatedCrop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cropId` INTEGER NOT NULL,
    `agentId` INTEGER NOT NULL,

    UNIQUE INDEX `MediatedCrop_cropId_key`(`cropId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Crop` ADD CONSTRAINT `Crop_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediatedCrop` ADD CONSTRAINT `MediatedCrop_cropId_fkey` FOREIGN KEY (`cropId`) REFERENCES `Crop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediatedCrop` ADD CONSTRAINT `MediatedCrop_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
