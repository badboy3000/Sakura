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
    path: '/creator',
    routes: [
      {
        path: 'post',
        component: require('views/creator/post.vue'),
      },
      {
        path: 'image',
        component: require('views/creator/image.vue'),
      },
      {
        path: 'review',
        component: require('views/creator/score.vue')
      }
    ]
  },
  {
    path: '/',
    component: require('views/homepage/index.vue')
  },
  {
    path: '/user/:zone',
    component: require('views/user/show.vue')
  },
  {
    path: '/bangumi/:id(\\d+)',
    component: require('views/bangumi/show.vue')
  },
  {
    path: '/comment/:id(\\d+)',
    component: require('components/comment/show.vue')
  },
  {
    path: '/video/:id(\\d+)',
    component: require('views/video/show.vue')
  },
  {
    path: '/role/:id(\\d+)',
    component: require('views/role/show.vue')
  },
  {
    path: '/pins/:id(\\d+)',
    component: require('views/image/show.vue')
  },
  {
    path: '/post/:id(\\d+)',
    component: require('views/post/show.vue')
  },
  {
    path: '/review/:id(\\d+)',
    component: require('views/score/show.vue')
  }
]
