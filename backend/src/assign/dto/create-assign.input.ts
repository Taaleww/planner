import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAssignInput {
  @Field(() => Int)
  userId: number;
}
