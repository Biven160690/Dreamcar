//Модуль store для users

import { email } from "vuelidate/lib/validators";

/*  {
"id": 1,
"name": "Leanne Graham",
"username": "Bret",Sincere@april.biz
"email": "",
"address": {
"street": "Kulas Light",
"suite": "Apt. 556",
"city": "Gwenborough",
"zipcode": "92998-3874",
"geo": {
"lat": "-37.3159",
"lng": "81.1496"
}
},
"phone": "1-770-736-8031 x56442",
"website": "hildegard.org",
"company": {
"name": "Romaguera-Crona",
"catchPhrase": "Multi-layered client-server neural-net",
"bs": "harness real-time e-markets"
}
}, */

export default {
  actions: {
    // Получение объекта users
    async fetchUsers(ctx) {

      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();

      // Обновление state с помощью мутации updateUsers т.к. экшн fetchUsers асинхронна

      ctx.commit("updateUsers", users);

   }

  },
  state: {
    /*
            isUserLogged хранит состояние, есть ли авторизированный user
            isUserDreamCar хранит состояние, являтся ли юзер представителем заказчика
            loggedUser хранит объект авторизированного пользователя
            users хранит массив объектов всех пользователей
        */
    isUserLogged: false,
    isUserDreamCar: false,
    loggedUser: [],
    users: []
  },
  // Мутация для изменения users в state
  mutations: {
    // данные из jsonplaceholder заносятся в стор, если массив пустой
    updateUsers(state, users) {
      if (users.length > 0 && state.users.length < 10) {
        for (var i = 0; i < users.length; i++) {
          // у всех пользователей устанавливается пароль 12345
          users[i].passw = "12345";

          var user = {
            id: users[i].id,
            name: users[i].name,
            email: users[i].email,
            company: users[i].company.name,
            phone: users[i].phone,
            passw: users[i].passw
          };
          state.users.push(user);
        }
      }
    },
    updateLoggedUser(state, user) {
      //если захотм изменить данные авторизации
      for (var i = 0; i < state.users.length; i++) {
        if (state.users[i].id == user.id) {
          state.users[i].name = user.name;
          state.users[i].email = user.email;
          state.users[i].company = user.company;
          state.users[i].phone = user.phone;
        }
      }
      for (var i = 0; i < state.loggedUser.length; i++) {
        if (state.loggedUser[i].id == user.id) {
          state.loggedUser[i].name = user.name;
          state.loggedUser[i].email = user.email;
          state.loggedUser[i].company = user.company;
          state.loggedUser[i].phone = user.phone;
        }
      }
    },

    updateLoggedUserPassword(state, user) {
      //изменение пароля
      for (var i = 0; i < state.users.length; i++) {
        // перебираем массив всех юзеров
        if (state.users[i].id === user.id) {
          state.users[i].passw = user.passw;
        }
      }
      for (var i = 0; i < state.loggedUser.length; i++) {
        // перебираем массив залогиненных юзеров
        if (state.loggedUser[i].id == user.id) {
          state.loggedUser[i].passw = user.passw;
        }
      }
    },

    // Мутация для добваления user в state
    pushUser(state, user) {
      state.users.push(user);
    },

    // Мутация для добваления logged user в state и установка флага 'заказчика'
    pushLoggedUser(state, user) {
      state.loggedUser.push(user);
      state.isUserLogged = true;
      //является ли юзер представителем заказчика (по имейлу)
      if (user.email === "dream_car@gmail.ru") {
        state.isUserDreamCar = true;
      } else {
        state.isUserDreamCar = false;
      }
    },
    //выход для юзера
    deletUser(state) {
      state.loggedUser.pop();
      state.isUserLogged = false;
      state.isUserDreamCar = false;
      this.$router.push("/");
    }
  },
  getters: {
    getAllUsers(state) {
      return state.users;
    },
    getUserById(state) {
      var result = {};
      return (result = state.users.filter(obj => {
        return obj.id === 2;
      }));
    },
    // возвращает состояние отображающее, авторизирован ли кто-нибудь
    isUserLogged(state) {
      return state.isUserLogged;
    },
    // возвращает состояние, являтся ли юзер представителем заказчика
    isUserDreamCar(state) {
      return state.isUserDreamCar;
    },
    // возвращает объект авторизированного пользователя
    getLoggedUser(state) {
    // return state.loggedUser[0];
        return state.loggedUser[state.loggedUser.length-1];


    }
  }
};
