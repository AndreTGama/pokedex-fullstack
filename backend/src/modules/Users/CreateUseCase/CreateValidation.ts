import { z } from 'zod';
import { ApiError } from '../../../errors/ApiError';

const createUserSchema = z.object({
    name: z.string({
        required_error: 'nome é obrigatório',
        invalid_type_error: 'O campo name deve ser uma string',
      }).refine(value => !/\s/.test(value), {
        message: 'O campo name não pode conter espaços',
      }),
    password: z.string({
        required_error: 'senha é obrigatória',
        invalid_type_error: 'O campo name deve ser uma string',
    }),
});

export class CreateValidation {
    static validate(
        data: z.infer<typeof createUserSchema>
    ): z.infer<typeof createUserSchema> {
        const validateData = createUserSchema.safeParse(data);

        if (!validateData.success)
            throw new ApiError(validateData.error.errors[0].message);
        
        return data;
    }
}
