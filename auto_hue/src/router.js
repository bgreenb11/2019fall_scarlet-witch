import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/devices",
      name: "devices",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "devices" */ "./views/Devices.vue")
    },
    {
      path: "/device/:id",
      name: "device",
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "device" */ "./views/Device.vue")
    },
    {
      path: "/group/:id",
      name: "group",
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "group" */ "./views/Group.vue")
    },
    {
      path: "/schedule/:id?",
      name: "schedule",
      props: true,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "device" */ "./views/Schedule.vue")
    },

    // // Spotify web player routes
    // {
    //   path: "/lightshow",
    //   name: "lightshow",
    //   component: () =>
    //     import(/* webpackChunkName: "lightshow" */ "./views/Lightshow.vue")
    // },
    // {
    //   path: "/spotifylogin",
    //   name: "spotifylogin",
    //   beforeEnter(to, from, next) {
    //     let domain = "https://accounts.spotify.com/authorize";
    //     let type = "token";
    //     let clientID = "9522a51415704f4c91b4829149e66c9f";
    //     let callback = encodeURIComponent("http://localhost:8080/#/auth");

    //     if (clientID) {
    //       const URL = `${domain}?response_type=${type}&client_id=${clientID}&redirect_uri=${callback}`;
    //       window.location = URL;
    //     } else {
    //       next();
    //     }
    //   }
    // },
    // {
    //     path: "/auth",
    //     name: "auth",
    //     beforeEnter(from) {
    //     console.log(from);
    //       if (from.hash) {
    //         console.log(from.hash);
  
    //         // if (data.error) {
    //         //   router.push("/login");
    //         // } else {
    //         //   sessionStorage.setItem("spotify-user-token", JSON.stringify(data));
    //           router.push("/lightshow");
    //     //     }
    //     //   } else {
    //     //     router.push("/login");
    //     //   }
    //       }
    //     }
    //   }
  ]
});

export default router;
