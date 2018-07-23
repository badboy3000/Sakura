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
    path: '/tabs',
    component: require('layouts/tabs.vue'),
    /*
    routes: [
      {
        path: '/',
        redirect: '/tabs/world'
      },
      {
        path: 'world',
        id: 'tab-world',
        component: require('pages/world/_container.vue'),
        routes: [
          {
            path: '/',
            redirect: '/tabs/world/post'
          },
          {
            path: 'post',
            id: 'world-post',
            component: require('pages/world/post.vue')
          },
          {
            path: 'image',
            id: 'world-image',
            component: require('pages/world/image.vue')
          },
          {
            path: 'review',
            id: 'world-review',
            component: require('pages/world/review.vue')
          },
        ],
      },
      {
        path: 'bangumi',
        id: 'tab-bangumi',
        component: require('pages/bangumi/_container.vue'),
        routes: [
          {
            path: '/',
            redirect: '/tabs/bangumi/release'
          },
          {
            path: 'release',
            id: 'bangumi-release',
            component: require('pages/bangumi/release.vue')
          },
          {
            path: 'timeline',
            id: 'bangumi-timeline',
            component: require('pages/bangumi/timeline.vue')
          },
          {
            path: 'category',
            id: 'bangumi-category',
            component: require('pages/bangumi/category.vue')
          },
        ],
      },
      {
        path: 'user',
        id: 'tab-user',
        component: require('pages/user/self.vue')
      },
      {
        path: 'about',
        id: 'tab-about',
        component: require('pages/about/us.vue')
      },
    ]
    */
  },
  {
    path: '/bangumi/:id(\\d+)',
    component: require('pages/bangumi/show.vue')
  }
]
