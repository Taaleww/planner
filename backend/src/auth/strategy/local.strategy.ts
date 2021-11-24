import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import loginInput from "../dto/login.input";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({ usernameField: "email"}); //config
    }

    //validate if user is authorized
    async validate(loginInput: loginInput): Promise<any> {
        const user = await this.authService.validateUser(loginInput);
        
        if(!user){
        console.log("1");
        
            throw new UnauthorizedException();
        }

        return user
    }
}