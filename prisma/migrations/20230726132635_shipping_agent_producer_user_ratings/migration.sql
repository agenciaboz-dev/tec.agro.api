-- DropIndex
DROP INDEX `Crop_producerId_fkey` ON `Crop`;

-- DropIndex
DROP INDEX `MediatedCrop_agentId_fkey` ON `MediatedCrop`;

-- DropIndex
DROP INDEX `Message_chatId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `Message_userId_fkey` ON `Message`;

-- AlterTable
ALTER TABLE `Agent` ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 5,
    ADD COLUMN `ratings` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Business` ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 5,
    ADD COLUMN `ratings` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Crop` ADD COLUMN `ratings` INTEGER NOT NULL DEFAULT 0,
    MODIFY `gallery` TEXT NOT NULL DEFAULT '',
    MODIFY `image` TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Producer` ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 5,
    ADD COLUMN `ratings` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Shipping` ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 5,
    ADD COLUMN `ratings` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `ratings` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Producer` ADD CONSTRAINT `Producer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shipping` ADD CONSTRAINT `Shipping_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agent` ADD CONSTRAINT `Agent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Crop` ADD CONSTRAINT `Crop_producerId_fkey` FOREIGN KEY (`producerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediatedCrop` ADD CONSTRAINT `MediatedCrop_cropId_fkey` FOREIGN KEY (`cropId`) REFERENCES `Crop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MediatedCrop` ADD CONSTRAINT `MediatedCrop_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatToUser` ADD CONSTRAINT `_ChatToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Chat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ChatToUser` ADD CONSTRAINT `_ChatToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToCrop` ADD CONSTRAINT `_CategoryToCrop_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToCrop` ADD CONSTRAINT `_CategoryToCrop_B_fkey` FOREIGN KEY (`B`) REFERENCES `Crop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
