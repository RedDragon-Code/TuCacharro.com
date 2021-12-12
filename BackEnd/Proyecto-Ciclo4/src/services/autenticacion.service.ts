import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../Confident/llaves';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
const generador = require("password-generator")
const crypt = require("crypto-js")
const jwt = require("jsonwebtoken") //Siempre q se instala un paquete debemos importarlo

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository//Instanciando el objeto de la clase clienterepository q permite la conexion a la base de datos para realizar la consulta
  ) { }

  /*
   * Add service methods here
   */
  GenerarClave() { //metodo q genera la contraseña
    let contraseña = generador(8, false); //codigo q me genera la contraseña con los parametros
    return contraseña;
  }
  CifrarClave(contraseña: string) { //metodo q me encripta la contraseña
    let claveCifrada = crypt.MD5(contraseña).toString();
    return claveCifrada;
  }

  IdentificarCliente(usuario: string, clave: string) { //Metodo q me hace la verificacion del cliente en la base de datos
    try {    //siempre q quiera conectarse a la base de datos utilizar el try catch
      let datoGuardado = this.clienteRepository.findOne({where: {Correo: usuario, Clave: clave}}); //Codigo q me busca en la base de datos el cliente si ya esta en la base o no
      if (datoGuardado) {
        return datoGuardado;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
  GenerarTokenJWT(cliente: Cliente) {  //Metodo q me crea el token donde se guardara los datos del cliente q me va hacer la autenticacion
    let token = jwt.sign({  //Codigo y metodo sign q va generar el token con los datos q se requiera.. el token es una manera de encriptar los datos
      datos: {
        id: cliente.id,
        correo: cliente.Correo,
        nombre: cliente.Nombre + " " + cliente.Apellidos
      }
    },
      llaves.JWTclave);
    return token;
  }
  ValidarTokenJWT(token: string) { //Metodo q recibe el token para ser verificado
    try {
      let datos = jwt.verify(token, llaves.JWTclave); //JWT veifica el token enviado anteriormente y valida q la firma sea generada desde mi plataforma
      return datos;
    } catch {
      return false;
    }
  }
}
