import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

    const options = new DocumentBuilder()
        .setTitle('SiteMaster')
        .setDescription('The SiteMaster API description.')
        .setVersion('1.0.0')
        .addBearerAuth()
        // .addServer('http://')
        // .addServer('https://')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('', app, document);
    await app.listen(3000);
}
bootstrap();
