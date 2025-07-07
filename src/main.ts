import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/base/filters/http-exception.filter';
import { CustomLogger } from './shared/base/logger/custom.logger';
import { EnviromentVariablesEnum } from '../config/enum/enviroment.variables.enum';
import ConverterUtil from './shared/base/utils/converter.util';

async function bootstrap() {

  const enviroment = process.env.NODE_ENV.toUpperCase();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());

  const logger = new CustomLogger('Default API');

  const enabledCors = ConverterUtil.parseBoolean(configService.get(EnviromentVariablesEnum.ENABLE_CORS));

  if (enabledCors) {
    const corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization'
    };
    app.enableCors(corsOptions);

    logger.log('main', 'main', 'CORS ENABLED');
  }

  const enabledDocs = ConverterUtil.parseBoolean(configService.get(EnviromentVariablesEnum.ENABLE_DOCS));

  if (enabledDocs) {

    const theme = new SwaggerTheme();

    const options = {
      explorer: true,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
    };

    const swaggerOptions = new DocumentBuilder()
      .setTitle(`DEFAULT API | ${enviroment}`)
      .setVersion('0.0.1')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      )
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('docs', app, document, options);

    logger.log('main', 'main', 'ENABLE DOCS');
  }

  const port = configService.get(EnviromentVariablesEnum.PORT) || 3000;
  await app.listen(port);
  logger.log('main', 'main', `DEFAULT API started`, { enviroment, port });
}
bootstrap();
