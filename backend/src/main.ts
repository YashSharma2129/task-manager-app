import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  const allowedOrigins = [
    'http://localhost:5173', // Development frontend
    'https://task-manager-app-frontend.onrender.com', // Production frontend (update this URL)
    process.env.FRONTEND_URL || 'http://localhost:5173' // Environment variable for frontend URL
  ];
  
  app.enableCors({ 
    origin: allowedOrigins,
    credentials: true 
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  
  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
