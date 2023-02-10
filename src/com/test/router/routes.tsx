export default function getDefaultRoleRoute(role: string): string {
  switch (role) {
    case 'ADMIN': return '/main'
    case 'USER': return '/main'
    default: return "/main";
  }
}