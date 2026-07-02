import type { z } from "zod";

import type { ProductSpecificationSchema } from "../validators/product-specification.validator.js";

export type ProductSpecification = z.infer<
    typeof ProductSpecificationSchema
>;