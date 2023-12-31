import { container } from 'tsyringe';
import { ITeamsRepository } from '../repositories/ITeamsRepository';
import { TeamsRepositoryPrisma } from '../repositories/prisma/TeamsRepositoryPrisma';
import { IPokemonsRepository } from '../repositories/IPokemonsRepository';
import { PokemonsRepositoryPrisma } from '../repositories/prisma/PokemonsRepositoryPrisma';
import { TeamsHasPokemonRepositoryPrisma } from '../repositories/prisma/TeamsHasPokemonRepositoryPrisma';
import { ITeamsHasPokemonsRepository } from '../repositories/ITeamsHasPokemonsRepository';

container.registerSingleton<ITeamsRepository>('TeamsRepository', TeamsRepositoryPrisma);
container.registerSingleton<IPokemonsRepository>('PokemonsRepository', PokemonsRepositoryPrisma);
container.registerSingleton<ITeamsHasPokemonsRepository>('TeamsHasPokemonsRepository', TeamsHasPokemonRepositoryPrisma);