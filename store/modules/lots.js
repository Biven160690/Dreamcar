//Модуль лотов

export default {
  state: {
    lots: [
      {
        id: 1,
        part_id: 1,
        part_name: "Brake disc",
        part_decstiption: "Brake disc  for passenger cars.Disc brakes have been around for a long time. They have proven themselves well and are widely used today. But first things first.",
        quantity: 50,
        status: "open",
        expirationTime: "2021-04-29 19:08",
        timer: "2021-04-29 19:08",
        desiredPrice: 90,
        bid: "",
        image: require("../../assets/img/Brake_dick.png"),
        nowData: "2021-02-25 11:30"
      },
      {
        id: 2,
        part_id: 3,
        part_name: "Shock absorber",
        part_decstiption: "Shock absorber for passenger cars.The characteristic of the shock absorber is the dependence of the forces of its resistance4 on the speed of movement of the piston. As a rule, it is asymmetrical - the resistance in compression is less than in tension. This limits the load transferred to the body when the wheel hits a bump.",
        quantity: 10,
        status: "open",
        expirationTime: "2021-04-30 18:00",
        timer: "2021-04-21 18:00",
        desiredPrice: 75,
        bid: "",
        image: require("../../assets/img/Shock_absorber.png"),
        nowData: "2021-03-20 15:00"
      },
            {
        id: 3,
        part_id: 3,
        part_name: "Suspension",
        part_decstiption: "Suspension for passenger cars.Disc brakes have been around for a long time. They have proven themselves well and are widely used today. But first things first.",
        quantity: 50,
        status: "open",
        expirationTime: "2021-04-25 19:08",
        timer: "2021-04-25 19:08",
        desiredPrice: 90,
        bid: "",
        image: require("../../assets/img/Suspension.jpg"),
        nowData: "2021-03-25 11:30"
      },
    ],
    // Массив для хранение статусов (перебираются все лоты и сюда выводиться статус каждого лота).
    addStatuses: [],

    //Массив для  хранения имен (перебираются все лоты и сюда выводиться имя каждого лота).
    addNames: [],

    // Массив для  хранения отсортированных объектов при поиске (когда мы задаем параметры в поиске, объекты в лотах  фильтруются по заданным параметрам и выводяться в этот массив).
    filteredLots: []
  },

  mutations: {
    // добавляем новый лот
    pushLot(state, lot) {
      state.lots.push(lot);
      if (lot.part_name === "Brake disc") {
        return (lot.image = require("../../assets/img/Brake_dick.png"));
      } else if (lot.part_name === "Wheel") {
        return (lot.image = require("../../assets/img/Wheel.jpg"));
      } else if (lot.part_name === "Suspension") {
        return (lot.image = require("../../assets/img/Suspension.jpg"));
      } else if (lot.part_name === "Headlight") {
        return (lot.image = require("../../assets/img/Headlight.jpg"));
      }
    },
    // Изменение статуса лота  в зависимости от времени и ставки.
    updateStatuses(state) {
      var time = new Date();
      for (var i = 0; i < state.lots.length; i++) {
        if (
           state.lots[i].bid == "" &&
          Date.parse(state.lots[i].expirationTime) > time
        ) {
          state.lots[i].status == "open";
        } else if (Date.parse(state.lots[i].expirationTime) < time) {
          state.lots[i].status = "closed";
        } else if (state.lots[i].bid > 0) {
          if (
            state.lots[i].desiredPrice >= state.lots[i].bid ||
            Date.parse(state.lots[i].expirationTime) < time
          ) {
            if (state.lots[i].status != "closed") {
              state.lots[i].status = "closed";
              state.lots[i].timer = "00:00:00:00";
              alert("Auction for lot.id = " + state.lots[i].id + " stopped!");
            }
          }
        }
      }
    },
    //Перебираем все лоты и выводим имена и статусы.
    dataForSearch(state) {
      var status = [];
      for (var i = 0; i < state.lots.length; i++) {
        status.push(state.lots[i].status);
        state.addStatuses = status;
      }
      var name = [];
      for (var i = 0; i < state.lots.length; i++) {
        name.push(state.lots[i].part_name);
        state.addNames = name;
      }
    },
    //Поиск объектов по заданным параметрам(работа поиска на странице лотов)
    lotFilter(state, search) {
      var data = [];
      data = state.lots.filter(lot =>
        lot.status == search.status && lot.part_name == search.name
          ? lot.status == search.status && lot.part_name == search.name
          : (lot.part_name == search.name && search.status == "") ||
            (lot.status == search.status && search.name == "")
      );
      state.filteredLots = data;
      if (data.length == 0)
        alert("This lot does not exist or data has not been entered");
    },
    // Удаление заданных параметров в поиске (кнопка clear на странице лотов)
    deleteSearchParameters(state) {
      state.filteredLots = state.lots;
    }
  },
  getters: {
    getAllLots(state) {
      return state.lots;
    },
    getAddStatuses(state) {
      // передаем статусы всех лотов
      return state.addStatuses;
    },
    getAddNames(state) {
      //передаем имена всех лотов
      return state.addNames;
    },
    getlotFilterAndAllLots(state) {
      // передаем все лоты или передаем отфильтрованные лоты
      return state.filteredLots.length
        ? state.filteredLots
        : (state.filteredLots = state.lots);
    }
  }
};
