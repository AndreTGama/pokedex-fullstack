import { z } from 'zod';
import { ApiError } from '../../../errors/ApiError';

const insertPokemonTeamSchema = z.object({

    pokemon: z.number({
        required_error: 'Id do Pokémon é obrigatório',
    }).refine(value => typeof value === 'number', {
        message: 'O campo "Pokémon" deve ser um número',
    }),
});

export class InsertPokemonValidation {
    static validate(
        data: z.infer<typeof insertPokemonTeamSchema>
    ): z.infer<typeof insertPokemonTeamSchema> {
        const validateData = insertPokemonTeamSchema.safeParse(data);

        if (!validateData.success)
            throw new ApiError(validateData.error.errors[0].message);
        
        return data;
    }
}
