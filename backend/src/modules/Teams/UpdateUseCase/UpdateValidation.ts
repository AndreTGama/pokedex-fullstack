import { z } from 'zod';
import { ApiError } from '../../../errors/ApiError';

const updateTeamsSchema = z.object({
    name: z.string({
        required_error: 'name é obrigatório',
        invalid_type_error: 'O campo name deve ser uma string',
    }),
    pokemons: z.array(z.number()).refine(data => data.length >= 5 && data.length <= 5, {
        message: 'A lista de Pokémons deve ter exatamente 5 pokémons',
      }),
});

export class UpdateValidation {
    static validate(
        data: z.infer<typeof updateTeamsSchema>
    ): z.infer<typeof updateTeamsSchema> {
        const validateData = updateTeamsSchema.safeParse(data);

        if (!validateData.success)
            throw new ApiError(validateData.error.errors[0].message);
        
        return data;
    }
}
