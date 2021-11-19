import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, createBindingFromClass} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {OpenApiSpec, RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {PasswordHasherBindings, TokenServiceBindings, TokenServiceConstants, UserServiceBindings} from './config/keys';
import {MySequence} from './sequence';
import {BcryptHasher, JWTService, MyUserService} from './services';
import {JWTAuthenticationStrategy} from './strategies/jwt-strategy';
import {SECURITY_SCHEME_SPEC, SECURITY_SPEC} from './utils/security-spec';
//import {AuthorizationComponent} from '@loopback/authorization';


export {ApplicationConfig};

export class Src extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

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

    // Bind authentication component related elements
    // Vincular elementos relacionados con el componente de autenticación
    this.component(AuthenticationComponent);
    //this.component(JWTAuthenticationComponent);
    this.component(AuthenticationComponent);

    this.add(createBindingFromClass(JWTAuthenticationStrategy));
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);


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

    this.setUpBindings();

    const spec: OpenApiSpec = {
      openapi: '3.0.0',
      info: {title: 'pkg.name', version: 'pkg.version'},
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      servers: [{url: '/api'}],
      security: SECURITY_SPEC,
    };
    this.api(spec);

  }

private setUpBindings(): void {

    // Bind package.json to the application context
    // this.bind(PackageKey).to(pkg);

    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);

    // // Bind bcrypt hash services
    this.bind(PasswordHasherBindings.ROUNDS).to(10);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }
}
