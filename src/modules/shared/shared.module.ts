import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from './service/response.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([])],
    providers: [ResponseService],
    exports: [ResponseService]
})
export class SharedModule {}
