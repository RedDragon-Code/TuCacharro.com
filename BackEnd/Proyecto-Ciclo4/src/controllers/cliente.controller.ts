import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Cliente, Credenciales} from '../models'; //Modelo donde encontramos los datos del usuario y contraseña para realizar la autenticacion e idnetificacion del cliente
import {ClienteRepository} from '../repositories';
import {AutenticacionService} from '../services';
const Fetch = require("node-fetch");

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @service(AutenticacionService) //se instancia el objeto de la clase autenticacionservice para acceder a los metodos q hay en ella
    public servicioautenticacion: AutenticacionService,
  ) { }
  //Metodo post q identifica los usuarios de la app
  @post("/IdentificacionCliente", { //se ejecuta en la pagina identificacion cliente
    responses: {
      '200': {     //se ejecuta mientras la respuesta sea 200
        description: "Identificacion de los clientes" //Se muestra en el encabezado de la pagina
      }
    }
  })
  async IdentificacionCliente(
    @requestBody() credenciales: Credenciales) { //Recibe las credenciales desde la pagina identificacion cliente y toda la informacion de la pagina debe ir en el body para poder utilizarla hacemos el request body
    let p = await this.servicioautenticacion.IdentificarCliente(credenciales.Usuario, credenciales.Clave);
    if (p) {
      let token = this.servicioautenticacion.GenerarTokenJWT(p);
      return {
        data: {
          nombre: p.Nombre,
          correo: p.Correo,
          id: p.id
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("los datos que esta suministrando no son validos");
    }
  }
  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    let clave = this.servicioautenticacion.GenerarClave();
    let cifrada = this.servicioautenticacion.CifrarClave(clave); //este metodo recibe una clave la cual se creaa en la linea anterior
    cliente.Clave = cifrada
    let x = await this.clienteRepository.create(cliente); //este codigo me espera a q le mande el return para enviar la informacion del cliente creado a la base de datos
    // Notificacion al usuario
    let destino = cliente.Correo;
    let asunto = "Registro en la App TuCarroYa"
    let contenido = `Hola, ${cliente.Nombre}, su usuario es: ${cliente.Correo}. La contraseña de acceso es: ${clave}` //String template `` tipo de dato q permite la combinacion de strings con los datos q se extraen desde alguna parte del programa
    fetch(``) //Interpolacion de variables "${}" TODO

    return x;
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
