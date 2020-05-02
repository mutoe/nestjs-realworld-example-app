import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

function createSwagger (app: INestApplication) {
  const version = require('../package.json').version || ''

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
  await app.listen(3000)
}

bootstrap().catch(err => console.error(err))
