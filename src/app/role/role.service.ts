import { Service } from 'src/decorators/service.decorator';

@Service()
export class RoleService {
    getHello(): string {
        return 'Hello Role!';
    }
}
