import { UserEntity } from '../entities/user.entity';

export interface IUsersRepository {
    saveData(user: UserEntity): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity | null>;
}
