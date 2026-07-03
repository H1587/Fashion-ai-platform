import { z } from "zod";

import { updateDesignWizardSchema } from "../validators/design-wizard.validator.js";

export type UpdateDesignWizardType = z.infer<
    typeof updateDesignWizardSchema
>;