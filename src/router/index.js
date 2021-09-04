import { createRouter, createWebHistory } from "vue-router";

import UserAuth from "../views/auth/UserAuth.vue";
import UserWelcome from "../views/initiator/UserWelcome.vue";
import NewTransaction from "../views/initiator/NewTransaction.vue";
import PostSuccess from "../views/initiator/PostSuccess.vue";
import PendingApprovals from "../views/approver/PendingApprovals.vue";
import ViewTransaction from "../views/approver/ViewTransaction.vue";
import ApprovalSuccess from "../views/approver/ApprovalSuccess.vue";
import ApprovalHistory from "../views/approver/ApprovalHistory.vue";
import ViewTransactionDetails from "../views/approver/ViewTransactionDetails.vue";
import TransactionHistory from "../views/initiator/TransactionHistory.vue";
import ViewDetails from "../views/initiator/ViewDetails.vue";
import PendingRequests from "../views/initiator/PendingRequests.vue";

// import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "Login",
    component: UserAuth,
  },
  {
    path: "/user-welcome",
    name: "Initiator Welcome",
    component: UserWelcome,
    meta: { requiresAuth: true },
  },
  {
    path: "/new-transaction",
    name: "New Transaction",
    component: NewTransaction,
    meta: { requiresAuth: true },
  },
  {
    path: "/post-successful",
    name: "Post Success",
    component: PostSuccess,
    meta: { requiresAuth: true },
  },
  {
    path: "/pending-approvals",
    name: "Pending Approvals",
    component: PendingApprovals,
    meta: { requiresAuth: true },
  },
  {
    path: "/view-transaction",
    name: "View Transaction",
    component: ViewTransaction,
    meta: { requiresAuth: true },
  },
  {
    path: "/approval-success",
    name: "Approval Success",
    component: ApprovalSuccess,
    meta: { requiresAuth: true },
  },
  {
    path: "/approval-history",
    name: "Approval History",
    component: ApprovalHistory,
    meta: { requiresAuth: true },
  },
  {
    path: "/view-transaction-details",
    name: "View Transaction Details",
    component: ViewTransactionDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/transaction-history",
    name: "Transaction History",
    component: TransactionHistory,
    meta: { requiresAuth: true },
  },
  {
    path: "/view-details",
    name: "View Details",
    component: ViewDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/pending-requests",
    name: "Pending Requests",
    component: PendingRequests,
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//Global navigation guard which takes route-specific settings into account
// router.beforeEach(function(to, _, next) {
//   if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
//     next("/");
//   } else {
//     next();
//   }
// });

export default router;
