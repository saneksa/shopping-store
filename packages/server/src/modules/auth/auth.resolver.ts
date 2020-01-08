import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { RegistrationParams } from "src/graphql.schema";

@Resolver("Auth")
export class AuthResolver {
  @Query()
  login() {
    return "Ddd";
  }

  @Mutation("registration")
  public async registration(@Args("params") args: RegistrationParams) {
    console.warn(JSON.stringify(args));

    return true;
  }
}
