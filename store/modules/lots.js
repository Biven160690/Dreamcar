//������ store ��� lots

export default {
  state: {
    lots: [
      {
        id: 1,
        part_id: 1,
        part_name: "Brake disc",
        part_description: "brake disc kjhkjhfkdhgkdh",
        quantity: 50,
        status: "open",
        expirationTime: "2021-03-22 19:08",
        desiredPrice: 90,
        bid: 50
      },
      {
        id: 2,
        part_id: 3,
        part_name: "Suspension",
        part_description: "suspension fhdkhdffdfdgh",
        quantity: 10,
        status: "open",
        expirationTime: "2021-03-19 18:00",
        desiredPrice: 75,
        bid: 70
      },

    ],
    // Массив для хранение статусов (перебираются все лоты и сюда выводиться статус каждого лота).
    addStatuses: [],

    //Массив для  хранения имен (перебираются все лоты и сюда выводиться имя каждого лота).
    addNames: [],

    // Массив для  хранения отсортированных объектов при поиске (когда мы задаем параметры в поиске, объекты в лотах  фильтруются по заданным параметрам и выводяться в этот массив).
    filteredLots:[]
  },
  mutations: {
    // ������� ��� ���������� lot � state
    pushLot(state, lot) {
      state.lots.push(lot);
    },
    // Изменение статуса лота  в зависимости от времени и ставки.
    updateStatuses(state) {
      var time = new Date();
      for (var i = 0; i < state.lots.length; i++) {
        if (
          state.lots[i].desiredPrice >= state.lots[i].bid ||
          Date.parse(state.lots[i].expirationTime) < time
        ) {
          if (state.lots[i].status != "closed") {
            state.lots[i].status = "closed";
            alert("Auction for lot.id = " + state.lots[i].id + " stopped!");
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
      if (data == 0) alert("This lot does not exist");
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
    getAddStatuses(state) { // передаем статусы всех лотов
      return state.addStatuses;
    },
    getAddNames(state) { //передаем имена всех лотов
      return state.addNames;
    },
    getlotFilterAndAllLots(state) { // передаем все лоты или передаем отфильтрованные лоты
      return state.filteredLots.length
        ? state.filteredLots
        : (state.filteredLots = state.lots);
    }
  }
};
