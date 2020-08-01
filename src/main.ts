import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from 'app.module'

import { version } from '../package.json'

function createSwagger (app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Nestjs Realworld Example App')
    .setVersion(version)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document)
}

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  if (process.env.SWAGGER_ENABLE && process.env.SWAGGER_ENABLE === 'true') {
    createSwagger(app)
  }

  await app.listen(3000)
}

bootstrap().catch(err => console.error(err))
