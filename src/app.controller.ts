import { Body, Controller, Post, Res, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { datoService } from './app.service';
import * as path from 'path';
import * as Redis from 'redis';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @Post()
  newUser(@Body() body: any): string {
    const redisClient = Redis.createClient();
    redisClient.set('nombre_de_la_clave', JSON.stringify(body));
    redisClient.quit();
    return this.appService.newUser(body);
  }

  @Get('creado')
  getConfirmation(@Res() res): void {
    const filePath = path.join(__dirname, '..', 'public', 'creado.html');
    res.sendFile(filePath);
  }
}

@Controller('register')
export class RegistrosController {
  constructor(private readonly micappControllerBd: datoService) {}

  @Post()
  async createRegistro(
    @Body('Usuario') Usuario: string,
    @Body('Contraseña') Contraseña: string,
    @Body('Correo') Correo: string,
    @Res() res,
  ) {
    const existeUsuario = await this.micappControllerBd.findUserByEmail(Correo);
    if (existeUsuario) {
      res.redirect('repetido.html');
      return;
    }

    await this.micappControllerBd.createRegistro(Usuario, Contraseña, Correo);

    res.redirect('/creado');
  }
}
