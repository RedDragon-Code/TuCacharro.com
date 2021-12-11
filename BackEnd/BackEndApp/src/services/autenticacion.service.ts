import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PersonaRepository} from '../repositories';
const cryptoJS = require("crypto-js");
const generador = require("password-generator");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public PersonaRepository: PersonaRepository
  ) { }

  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifradoClave(clave: string) {
    let ClaveCifrada = cryptoJS.MD5(clave).toString();
    return ClaveCifrada;
  }

  IdentificarPersona(usuario: string, clave: string) {
    try {
      let p = this.PersonaRepository.findOne({
        where: {correo: usuario, clave: clave}
      });
      if (p) {
        return p;
      } else {
        return false;
      }
    } catch {
      return false;
    }

  }
}
