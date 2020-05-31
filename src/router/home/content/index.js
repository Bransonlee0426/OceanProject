export default [
  {
    path: '/',
    name: 'index',
    props: true,
    meta: { requireAuth: true },
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '/',
        name: 'Default',
        props: true,
        meta: { requireAuth: true },
        component: () => import('@/views/Default.vue'),
      },
      {
        path: '/Chat',
        name: 'Chat',
        props: true,
        meta: { requireAuth: true },
        component: () => import('@/views/Chat.vue'),
      },
    ],
  }];
