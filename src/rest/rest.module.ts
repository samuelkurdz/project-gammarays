import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CompanyModule],
  exports: [CompanyModule],
  controllers: [],
  providers: [],
})
export class RestModule {}
