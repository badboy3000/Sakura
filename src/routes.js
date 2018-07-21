export default [
  {
    path: '/',
    component: require('pages/user/sign.vue'),
  },
  {
    path: '/tabs',
    component: require('layouts/tabs.vue'),
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
            path: 'tags',
            id: 'bangumi-tags',
            component: require('pages/bangumi/tags.vue')
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
  }
]
