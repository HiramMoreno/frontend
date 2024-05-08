import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { registro } from './user.entity';

@Injectable()
export class AppService {
  constructor(@Inject('MAIL_SERVICE') private clientMail: ClientProxy) {}

  getHello(): string {
    return 'Soy el puerto 3000';
  }

  newUser(user: any) {
    this.clientMail.emit('new_mail', user); 
    return 'send_ queue';
  }
}

@Injectable()
export class datoService {
  constructor(
    @InjectRepository(registro) 
    private readonly userRepository: Repository<registro>,
    @Inject('MAIL_SERVICE') private clientRegister: ClientProxy
  ) {}

  async findUserByEmail(Correo: string): Promise<registro | undefined> {
    return await this.userRepository.findOne({ where: { Correo } }); // Aquí se especifica la propiedad 'Correo'
  }

  async createRegistro(Usuario: string, Contraseña: string, Correo: string): Promise<registro> {
    const newRegistro = await this.userRepository.create({ Usuario, Contraseña, Correo });
    return await this.userRepository.save(newRegistro);
  }

  newRegister(Usuario: any, Contraseña: any, Correo: any) {
    this.clientRegister.emit('new_Usuario', Usuario);
    this.clientRegister.emit('new_Contraseña', Contraseña); 
    this.clientRegister.emit('new_Correo', Correo); 
    return 'send_ queue';
  }
}