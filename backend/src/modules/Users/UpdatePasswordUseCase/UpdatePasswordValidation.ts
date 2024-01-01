import { z } from 'zod';
import { ApiError } from '../../../errors/ApiError';

const updatePasswordSchema = z.object({
    password: z.string({
        required_error: 'Senha é obrigatória',
        invalid_type_error: 'O campo name deve ser uma string',
    }),
    confirm_password: z.string({
        required_error: 'Confirmação da senha é obrigatória',
        invalid_type_error: 'O campo name deve ser uma string',
    }),
});

export class UpdatePasswordValidation {
    static validate(
        data: z.infer<typeof updatePasswordSchema>
    ): z.infer<typeof updatePasswordSchema> {
        const validateData = updatePasswordSchema.safeParse(data);

        if (!validateData.success)
            throw new ApiError(validateData.error.errors[0].message);
        
        return data;
    }
}
