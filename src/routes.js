export default [
  {
    path: '/launch',
    component: require('views/launch.vue'),
  },
  {
    path: '/sign',
    redirect: '/sign/in',
    routes: [
      {
        path: 'in',
        component: require('views/sign/signIn.vue'),
      },
      {
        path: 'up',
        component: require('views/sign/signUp.vue'),
      },
      {
        path: 'forgot',
        component: require('views/sign/forgotPassword.vue'),
      }
    ]
  },
  {
    path: '/homepage',
    component: require('views/homepage/index.vue')
  },
  {
    path: '/bangumi/:id(\\d+)',
    component: require('views/bangumi/show.vue')
  }
]
