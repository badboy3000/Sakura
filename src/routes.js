export default [
  {
    path: '/launch',
    component: require('pages/launch.vue'),
  },
  {
    path: '/sign',
    redirect: '/sign/in',
    routes: [
      {
        path: 'in',
        component: require('pages/sign/signIn.vue'),
      },
      {
        path: 'up',
        component: require('pages/sign/signUp.vue'),
      },
      {
        path: 'forgot',
        component: require('pages/sign/forgotPassword.vue'),
      }
    ]
  },
  {
    path: '/index',
    component: require('pages/index.vue')
  },
  {
    path: '/bangumi/:id(\\d+)',
    component: require('pages/bangumi/show.vue')
  }
]
