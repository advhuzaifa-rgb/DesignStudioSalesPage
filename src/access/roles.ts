import type { Access } from 'payload'

export const isLoggedIn: Access = ({ req }) => {
  return Boolean(req.user)
}

export const isAdmin: Access = ({ req }) => {
  return req.user?.role === 'admin'
}

export const isAdminOrEditor: Access = ({ req }) => {
  return req.user?.role === 'admin' || req.user?.role === 'editor'
}

export const canDelete: Access = ({ req }) => {
  return req.user?.role === 'admin'
}
