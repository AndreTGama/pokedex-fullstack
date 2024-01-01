import { container } from 'tsyringe';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { UsersRepositoryPrisma } from '../repositories/prisma/UsersRepositoryPrisma';
import { IPokemonsRepository } from '../repositories/IPokemonsRepository';
import { PokemonsRepositoryPrisma } from '../repositories/prisma/PokemonsRepositoryPrisma';
import { TeamsHasPokemonRepositoryPrisma } from '../repositories/prisma/TeamsHasPokemonRepositoryPrisma';
import { IUsersHasPokemonsRepository } from '../repositories/IUsersHasPokemonsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepositoryPrisma);
container.registerSingleton<IPokemonsRepository>('PokemonsRepository', PokemonsRepositoryPrisma);
container.registerSingleton<IUsersHasPokemonsRepository>('UsersHasPokemonsRepository', TeamsHasPokemonRepositoryPrisma);