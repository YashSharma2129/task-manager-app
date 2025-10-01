import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        return user;
    }

    async login(user: any) {
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async refresh(user: any) {
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
