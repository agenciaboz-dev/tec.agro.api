/*
  Warnings:

  - Added the required column `active` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Crop_producerId_fkey` ON `Crop`;

-- DropIndex
DROP INDEX `MediatedCrop_agentId_fkey` ON `MediatedCrop`;

-- DropIndex
DROP INDEX `Message_chatId_fkey` ON `Message`;

-- DropIndex
DROP INDEX `Message_userId_fkey` ON `Message`;

-- AlterTable
ALTER TABLE `Business` ADD COLUMN `active` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Crop` MODIFY `gallery` TEXT NOT NULL DEFAULT '',
    MODIFY `image` TEXT NOT NULL DEFAULT '';

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