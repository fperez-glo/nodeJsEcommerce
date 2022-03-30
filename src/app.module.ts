import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { CarritoModule } from './carrito/carrito.module';


@Module({
  imports: [ProductosModule, CarritoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
