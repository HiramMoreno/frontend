import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class registro {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Usuario: string;

  @Column()
  Contraseña: string;

  @Column()
  Correo: string;
}