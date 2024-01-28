// Задание 2
// Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

// Необходимо создать систему управления этими заказами, которая позволит:

// • Отслеживать, какой повар готовит какое блюдо.
// • Записывать, какие блюда заказал каждый клиент.

// Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

// Повара и их специализации:

// Виктор - специализация: Пицца.
// Ольга - специализация: Суши.
// Дмитрий - специализация: Десерты.

// Блюда и их повара:

// Пицца "Маргарита" - повар: Виктор.
// Пицца "Пепперони" - повар: Виктор.
// Суши "Филадельфия" - повар: Ольга.
// Суши "Калифорния" - повар: Ольга.
// Тирамису - повар: Дмитрий.
// Чизкейк - повар: Дмитрий.

// Заказы:

// Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
// Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
// Клиент Ирина заказала: Чизкейк.

class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
  }
}

class Chef {
  constructor(name, specialization) {
    this.name = name;
    this.specialization = specialization;
  }
}
class Manager {
  constructor() {
    this.chefs = new Map();
    this.menu = new Map();
  }

  addDish(name, type) {
    this.menu.set(name, type);
  }

  registerChef(name, specialization) {
    const chef = new Chef(name, specialization);
    this.chefs.set(specialization, chef);
  }

  newOrder(client, ...orders) {
    console.log(`Клиент ${client.firstname} заказал:`);
    for (const order of orders) {
      const { name, quantity, type } = order;
      if (!this.menu.has(name)) {
        console.error(`Десерт "${name}" - такого блюда не существует.`);
        continue;
      }

      const chef = this.chefs.get(this.menu.get(name));
      console.log(
        `${type} "${name}" - ${quantity}; готовит повар ${chef.name}`
      );
    }
  }
}

const manager = new Manager();

manager.registerChef("Виктор", "Пицца");
manager.registerChef("Ольга", "Суши");
manager.registerChef("Дмитрий", "Десерт");

manager.addDish("Маргарита", "Пицца");
manager.addDish("Пепперони", "Пицца");
manager.addDish("Три сыра", "Пицца");

manager.addDish("Филадельфия", "Суши");
manager.addDish("Калифорния", "Суши");
manager.addDish("Чизмаки", "Суши");

manager.addDish("Тирамису", "Десерт");
manager.addDish("Чизкейк", "Десерт");
manager.addDish("Штрудель", "Десерт");

// Sample1
manager.newOrder(
  new Client("Алексей"),
  { name: "Пепперони", quantity: 1, type: "Пицца" },
  { name: "Тирамису", quantity: 1, type: "Десерт" }
);

// Sample2
const clientMaria = new Client("Мария");

manager.newOrder(
  clientMaria,
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Калифорния", quantity: 1, type: "Суши" }
);

// Sample3
manager.newOrder(new Client("Ирина"), {
  name: "Чизкейк",
  quantity: 1,
  type: "Десерт",
});
