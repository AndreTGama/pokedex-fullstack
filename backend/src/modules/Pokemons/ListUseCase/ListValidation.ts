import { z } from 'zod';
import { ApiError } from '../../../errors/ApiError';
import { IPaginateBase } from '../../../interfaces/IPagenates';

const listSchema = z.object({
    page: z.string().transform(Number).default('1').optional(),
    take: z.string().transform(Number)
      .refine(value => Number.isInteger(value) && value >= 1 && value <= 25, {
        message: 'The field Take must be an integer between 1 and 25'
      })
    .optional(),
    type: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
});

export class ListValidation {
    static validate({
        page,
        take,
        name,
        type
    }: z.infer<typeof listSchema>): IPaginateBase {
      const validateData = listSchema.safeParse({ page, take, name, type });
  
      if (!validateData.success)
        throw new ApiError(validateData.error.errors[0].message);
  
      const data: IPaginateBase = {
        page: page ? Number(page) : 1,
        take: take ? Number(take) : 10,
        name: name ?? null,
        type: type ?? null
      };
  
      return data;
    }
  }