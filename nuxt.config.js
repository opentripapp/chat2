
module.exports = {
  mode:'spa',

  css:[
    {src:'element-ui/lib/theme-default/index.css',lang:'css'}
  ],

  /*
  ** Headers of the page
  */
  head: {
    title: 'OpenTrip',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'OpenTripChat App' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'manifest',  href: '/manifest.json' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', rel: 'stylesheet'},
      { href: 'https://qiscus-sdk.s3-ap-southeast-1.amazonaws.com/web/v2.5.11/qiscus-sdk.2.5.11.css', rel: 'stylesheet'},
      { href: '/css/roboto.css',rel:'stylesheet'}
    ],
    script:[
      { src: 'https://qiscus-sdk.s3-ap-southeast-1.amazonaws.com/web/v2.5.11/qiscus-sdk.2.5.11.js' }
    ]
  },

  plugins:['~/plugins/element-ui','~/plugins/infinite-scroll'],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor:['axios','validator','js-cookie','vuex-persistedstate','moment']
    /*
    ** Run ESLint on save
    *
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }*/
  }
}
