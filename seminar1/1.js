// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }

// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)

"use strict";

const musicCollection = {
  albums: [
    { title: "Tile1", artist: "Artist1", year: "Year1" },
    { title: "Title2", artist: "Artist2", year: "Year2" },
    { title: "Title3", artist: "Artist3", year: "Year3" },
  ],

  [Symbol.iterator]: function () {
    let currentIndex = 0;
    return {
      next: () => {
        if (currentIndex < this.albums.length) {
          const album = this.albums[currentIndex++];
          return { value: album, done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

// Sample

for (const album of musicCollection) {
  console.log(`${album.title} - ${album.artist} (${album.year})`);
}
