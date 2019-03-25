//面向对象编程(OOP)中，对象是类的实例。一个类定义了对象的特征

//我们声明一个类来表示书
function Book(title, pages, isbn) {
  this.title = title;
  this.pages = pages;
  this.isbn = isbn;
}

//实例化
var book = new Book('title', 'pag', 'isbn');

//访问和修改属性
console.log(book.title);//title
book.title = 'new title';
console.log(book.title);//new title

//类可以包含函数
Book.prototype.printTitle = function () {
  console.log(this.title);
};
book.printTitle();//new title


//也可以直接在类的定义声明函数
function Books(title, pages, isbn, prb) {
  this.title = title;
  this.pages = pages;
  this.isbn = isbn;
  this.prb = prb;
  this.printIsbn = function () {
    console.log(this.isbn);
  }
}

var book1 = new Books('js', '632', 'true', 'center');
book1.printIsbn();//true

/*
* 在原型上定义，printTitle函数只会创建一次，在所有的实例中共享。
*
* 如果在类的声明里定义，则每个实例都会创建自己的函数副本。
*
* 使用原型方法可以节约内存和降低实例化的开销。
*
* 不过原型方法只能声明公共函数和属性，而类定义可以声明只在类的内部访问的私有函数和属性。
*
* */


//ES6简洁的类声明
class BookES {
  constructor(title, pages, isbn) {
    this.title = title;
    this.pages = pages;
    this.isbn = isbn;
  }

  printPages() {
    console.log(this.pages);
  }
}

let book2 = new BookES('titl', 'pag', 'isbn');
console.log(book.title); //title
book.title = 'text';
console.log(book.title); //text

//继承
class ItBook extends BookES {
  //extends 扩展一个类并继承它的行为
  constructor(title, pages, isbn, tech) {
    //super 引用父类的构造函数
    super(title, pages, isbn);
    this.tech = tech;
  }

  printTech() {
    console.log(this.tech);
  }
}

let jsBook = new ItBook('learn js', '230', '123456520', 'javascript');
console.log(jsBook.title);  //learn js
console.log(jsBook.printTech);  //fn printTech(){}

//属性存储器
//只需要在要暴露和使用的函数名前面加上get/set关键字
class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    return this._name=value;
  }
}

let lotrChar = new Person('Frodo');
console.log(lotrChar.name); //Frodo
lotrChar.name = 'Gandalf';
console.log(lotrChar.name); //Gandalf
lotrChar._name = 'Sam';
console.log(lotrChar.name); //Sam
console.log(lotrChar._name); //Sam