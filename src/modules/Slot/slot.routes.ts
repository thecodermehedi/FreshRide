import { createRouter } from "../../utils";
import { slotController } from "./slot.controller";

const router = createRouter();

router.get('/availability', slotController.getSlots);

export const slotRoutes = router;
