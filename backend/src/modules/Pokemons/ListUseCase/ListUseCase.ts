import { inject, injectable } from "tsyringe";
import { IPaginateBase } from "../../../interfaces/IPagenates";
import { Pokemon } from "../../../services/Pokemon/Pokemon";


@injectable()
export class ListUseCase {
  constructor() {}

  async execute({page = 1, take = 10, type, name} : IPaginateBase) {
    
    const offset = (page! - 1) * take;

    const response = await Pokemon.pokemonList({limit: take, offset});

    return response
  }
}
