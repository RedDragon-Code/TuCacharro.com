import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'CacharroDB',
  connector: 'mongodb',
  url: 'mongodb+srv://RedDragon:DBpass2358@cluster0.urniq.mongodb.net/DBCacharroApp?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CacharroDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'CacharroDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.CacharroDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
