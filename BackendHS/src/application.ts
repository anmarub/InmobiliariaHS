import {AuthenticationComponent} from '@loopback/authentication';
import {JWTAuthenticationComponent} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class Src extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Bind authentication component related elements
    // Vincular elementos relacionados con el componente de autenticación
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.component(AuthenticationComponent);

    // Set up the custom sequence
    // Configurar la secuencia personalizada
    this.sequence(MySequence);

    // Set up default home page
    // Configurar la página de inicio predeterminada
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    // Personalice la configuración de @ loopback / rest-explorer aquí
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    // Personalice las convenciones de @ loopback / boot Booter aquí
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        //Personalice las convenciones de ControllerBooter aquí
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
