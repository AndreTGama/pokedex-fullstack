import { z } from 'zod';
import { ApiError } from '../../../errors/ApiError';

const createUserSchema = z.object({
    email: z.string({
        required_error: 'E-mail é obrigatório',
        invalid_type_error: 'O campo E-mail deve ser uma string',
      }),
    password: z.string({
        required_error: 'Senha é obrigatória',
        invalid_type_error: 'O campo senha deve ser uma string',
    }),
});

export class LoginValidation {
    static validate(
        data: z.infer<typeof createUserSchema>
    ): z.infer<typeof createUserSchema> {
        const validateData = createUserSchema.safeParse(data);

        if (!validateData.success)
            throw new ApiError(validateData.error.errors[0].message);
        
        return data;
    }
}
