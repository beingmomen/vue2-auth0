import auth0 from 'auth0-js'
import { EventEmitter } from 'events'

// Create a custom Auth event emitter
const authEventBus = new EventEmitter()

const localStorageKey = 'loggedIn'
const loginEvent = 'loginEvent'

export const Auth0Plugin = {
  install(Vue, options) {
    // Create a new Vue instance to use as an event bus
    Vue.prototype.$auth = new Vue({
      data() {
        return {
          loading: true,
          isAuthenticated: false,
          user: {},
          auth0Client: null,
          popupOpen: false,
          error: null
        }
      },
      methods: {
        // Initialize Auth0 client
        async init() {
          this.auth0Client = new auth0.WebAuth({
            domain: options.domain,
            clientID: options.clientId, // Make sure clientID is correct (note the capitalization)
            audience: options.audience,
            redirectUri: options.redirectUri, // Use the redirectUri from options explicitly
            responseType: 'token id_token',
            scope: 'openid profile email'
          })

          try {
            // If user is returning after authentication
            await this.handleAuthentication()
            
            // Check for authentication state on page reload
            const hasLoggedIn = window.localStorage.getItem(localStorageKey) === 'true'
            if (hasLoggedIn) {
              this.renewTokens()
            }
          } catch (e) {
            this.error = e
            console.error('Auth0 initialization error:', e)
          } finally {
            this.loading = false
          }
        },
        // Handle callback and parse authentication result
        async handleAuthentication() {
          return new Promise((resolve, reject) => {
            this.auth0Client.parseHash((err, authResult) => {
              if (err) {
                reject(err)
              } else if (authResult && authResult.accessToken && authResult.idToken) {
                this.localLogin(authResult)
                resolve()
              } else {
                resolve()
              }
            })
          })
        },
        // Perform local login and set tokens
        localLogin(authResult) {
          this.idToken = authResult.idToken
          this.accessToken = authResult.accessToken
          this.user = authResult.idTokenPayload
          this.isAuthenticated = true
          
          // Store login status in localStorage
          localStorage.setItem(localStorageKey, 'true')
          
          // Call the callback if available
          if (options.onRedirectCallback) {
            options.onRedirectCallback(authResult.appState)
          }
          
          // Emit login event
          authEventBus.emit(loginEvent, {
            loggedIn: true,
            user: authResult.idTokenPayload,
            state: authResult.appState
          })
        },
        // Renew tokens automatically 
        renewTokens() {
          this.auth0Client.checkSession({}, (err, authResult) => {
            if (err) {
              console.log(err)
              this.isAuthenticated = false
              localStorage.removeItem(localStorageKey)
              return
            }
            this.localLogin(authResult)
          })
        },
        // Login with redirect
        loginWithRedirect(o) {
          return this.auth0Client.authorize(o)
        },
        // Login with popup
        loginWithPopup(options) {
          this.popupOpen = true
          
          return new Promise((resolve, reject) => {
            this.auth0Client.popup.authorize(
              options,
              (err, authResult) => {
                this.popupOpen = false
                if (err) {
                  reject(err)
                  return
                }
                
                if (authResult && authResult.accessToken && authResult.idToken) {
                  this.localLogin(authResult)
                  resolve()
                }
              }
            )
          })
        },
        // Logout method
        logout() {
          localStorage.removeItem(localStorageKey)
          
          // Emit logout event
          authEventBus.emit(loginEvent, { loggedIn: false })
          
          this.isAuthenticated = false
          this.user = {}
          
          this.auth0Client.logout({
            returnTo: window.location.origin
          })
        }
      },
      created() {
        // Initialize the auth plugin when created
        this.init()
      }
    })
    
    // Create a wrapper for Auth0 events
    Vue.prototype.$authEvent = {
      on(eventName, cb) {
        authEventBus.on(eventName, cb)
      },
      off(eventName, cb) {
        authEventBus.off(eventName, cb)
      }
    }
  }
}
