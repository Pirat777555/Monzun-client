export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Monzun',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  target: 'static',   router: {     base: '/monzun-client/'   },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src:'@/plugins/socket', ssr:false},
    {src:'@/plugins/progressBar', ssr:false}    ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    "@nuxtjs/axios",
    'cookie-universal-nuxt',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
