import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDescriptionToProduct1710000000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'description');
  }
}
