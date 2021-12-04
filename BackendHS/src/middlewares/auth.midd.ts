import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
} from '@loopback/authorization';
import {securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';

// Instance level authorizer
// Can be also registered as an authorizer, depends on users' need.
export async function basicAuthorization(
  authorizationCtx: AuthorizationContext,
  metadata: AuthorizationMetadata,
): Promise<AuthorizationDecision> {
  // Sin acceso si faltan los detalles de la autorización
  let currentUser: UserProfile;
  if (authorizationCtx.principals.length > 0) {
    const user = _.pick(authorizationCtx.principals[0], ['id', 'name', 'role']);
    currentUser = {[securityId]: user.id, name: user.name, role: user.role};
  } else {
    return AuthorizationDecision.DENY;
  }

  if (!currentUser.role) {
    return AuthorizationDecision.DENY;
  }

  // Autorizar todo lo que no tenga una propiedad permitidaRoles
  if (!metadata.allowedRoles) {
    return AuthorizationDecision.ALLOW;
  }

  let roleIsAllowed = false;
  if (metadata.allowedRoles!.includes(currentUser.role)) {
    roleIsAllowed = true;
  }

  if (!roleIsAllowed) {
    return AuthorizationDecision.DENY;
  }

  // Las cuentas de administración y asistencia omiten la verificación de identificación
  if (
    currentUser.roles.includes('admin') ||
    currentUser.roles.includes('support')
  ) {
    return AuthorizationDecision.ALLOW;
  }
  /**
   * Permitir el acceso solo a los propietarios del modelo, utilizando la ruta como fuente de verdad
   *
   * p.ej. @post ('/ users / {userId} / orders', ...) devuelve `userId` como argumentos [0]
   */
  if (currentUser[securityId] === authorizationCtx.invocationContext.args[0]) {
    return AuthorizationDecision.ALLOW;
  }

  return AuthorizationDecision.DENY;
}
