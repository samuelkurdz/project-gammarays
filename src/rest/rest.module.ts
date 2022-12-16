import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CompanyModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class RestModule {}
