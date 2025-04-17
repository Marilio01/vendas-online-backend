import { MigrationInterface, QueryRunner } from 'typeorm';
 
 export class insertRootInUser1675770516768 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
     queryRunner.query(`
             INSERT INTO public."user"(
                 name, email, cpf, type_user, phone, password)
                 VALUES ('root', 'root@root.com', '12345678901', 2, '31925325252', '$2b$10$JkVYCWOtISym97ie9VaBtuPS/gHtVQLJNsEzbP9zf8.bkMs2AcKnW');
         `);
   }
 
   public async down(queryRunner: QueryRunner): Promise<void> {
     queryRunner.query(`
             DELETE FROM public."user"
                 WHERE email like 'root@root.com';
         `);
   }
 }