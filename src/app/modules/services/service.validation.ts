import { z } from "zod";
import { SERVICES_TYPE } from "../../../enums/services";

const createServiceZodSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        image: z.any(),
        adults_price: z.string({required_error:"adults_price is required"}),
        kids_price: z.string({required_error:"kids_price is required"}),
        service_price: z.string().optional()
      })

}
)

const createUpdateServiceZodSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Title is required").optional(),
        description: z.string().min(1, "Description is required").optional(),
        image: z.any().optional(),
        adults_price: z.string().optional(),
        kids_price: z.string().optional(),
        service_price: z.string().optional()
      })

}
)



export const ServiceValidation={
    createServiceZodSchema,
    createUpdateServiceZodSchema
}