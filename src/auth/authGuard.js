/**
 * Auth guard to protect routes that require authentication
 * @param {Object} to - the target route object
 * @param {Object} from - the current route object
 * @param {Function} next - callback to control next navigation step
 * @returns {void}
 */
export function authGuard(to, from, next) {
  const { $auth } = window.app

  // If loading has not yet completed
  const checkAuthAndNavigate = () => {
    // If the user is authenticated, continue to the route
    if ($auth.isAuthenticated) {
      return next()
    }
    
    // Otherwise redirect to the home page with a loginRequired flag
    return next({ path: '/', query: { loginRequired: 'true' } })
  }

  // If the auth plugin is still loading
  if ($auth.loading) {
    // Set up an event listener for when the authentication check is complete
    return $auth.$watch('loading', (loading) => {
      if (loading === false) {
        return checkAuthAndNavigate()
      }
    })
  }
  
  return checkAuthAndNavigate()
}
