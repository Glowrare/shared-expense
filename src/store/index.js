import { createStore } from "vuex";

import initiatorModule from "./modules/initiator/index.js";
import approverModule from "./modules/approver/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    initiator: initiatorModule,
    approver: approverModule,
    auth: authModule,
  },
});

export default store;
