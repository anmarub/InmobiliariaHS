import {
  AuthenticateFn, AuthenticationBindings, AUTHENTICATION_STRATEGY_NOT_FOUND, USER_PROFILE_NOT_FOUND
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {FindRoute, InvokeMethod, InvokeMiddleware, ParseParams, Reject, RequestContext, Send, SequenceActions, SequenceHandler} from '@loopback/rest';

export class MySequence implements SequenceHandler {

  @inject(SequenceActions.INVOKE_MIDDLEWARE, {optional: true})
  protected invokeMiddleware: InvokeMiddleware = () => false;

  constructor(
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,

    // ... other sequence action injections
  ) {}

  async handle(context: RequestContext) {
  try {
    const {request, response} = context;
    const finished = await this.invokeMiddleware(context);
    if (finished) return;
    const route = this.findRoute(request);
    //call authentication action
    await this.authenticateRequest(request);
    const args = await this.parseParams(request, route);
    const result = await this.invoke(route, args);
    this.send(response, result);
  } catch (err) {
    if (
      err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
      err.code === USER_PROFILE_NOT_FOUND
    ) {
      Object.assign(err, {statusCode: 401 /* Unauthorized */});
    }

    this.reject(context, err);
    return;
  }
}
}
