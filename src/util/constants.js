'use strict';

const CONSTANTS = {
  ROLE_USER: 0,
  ROLE_ADMIN: 1,
  ROLE_DEV: 2,

  TYPE_WAIT_LIST: 0,
  TYPE_MEMBER: 1,
  TYPE_WITH_GREENHOUSE: 2,
  TYPE_COLLABORATOR: 3,

  STATUS_INACTIVE: 0,
  STATUS_ACTIVE: 1,

  REQUEST_PENDING: 0,
  REQUEST_APPROVED: 1,
  REQUEST_REJECTED: 2,

  PAYMENT_TYPE_BANK: 0,
  PAYMENT_TYPE_CASH: 1,

  REQUEST_TYPE_REGISTER: 0,
  REQUEST_TYPE_UNREGISTER: 1,
  REQUEST_TYPE_ADD_COLLABORATOR: 2,
  REQUEST_TYPE_REMOVE_COLLABORATOR: 3,

  ANNOUNCE_PRIORITY_LOW: 0,
  ANNOUNCE_PRIORITY_MEDIUM: 1,
  ANNOUNCE_PRIORITY_HIGH: 2,

  PAYMENT_FREQUENCY_BIYEARLY: 0,
  PAYMENT_FREQUENCY_YEARLY: 1,
};

export { CONSTANTS };