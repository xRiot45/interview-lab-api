import { Service } from 'src/decorators/service.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Service()
export class UsersService {
    create(createUserDto: CreateUserDto) {
        console.log(createUserDto);
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        console.log(updateUserDto);
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
