import type { UserRole } from '../types';
import type { AppView } from '../context/AppContext';
export function roleHome(role: UserRole): AppView {
  if (role === 'administrator' || role === 'super_admin') return 'admin';
  if (role === 'instructor') return 'instructor';
  if (role === 'mentor') return 'mentor';
  if (role === 'organization_admin') return 'teams';
  return 'dashboard';
}
export const roleLabels: Record<UserRole,string> = {
  student:'Creator workspace',mentor:'Mentor workspace',instructor:'Instructor Studio',
  organization_admin:'Organization workspace',administrator:'Admin dashboard',super_admin:'Admin dashboard',
};
