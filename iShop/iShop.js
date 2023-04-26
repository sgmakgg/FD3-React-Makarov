class Product{
    constructor(name, price, imageURL, warehouseQuantity) {
        this.name = name;
        this.price = price;
        this.imageURL = imageURL;
        this.warehouseQuantity = warehouseQuantity;
    }
}

let shopProducts = [
    new Product(
        'Milk',
        1.50,
        '/images/milk.png',
        100),
    new Product(
        'Olive oil',
        20.22,
        '/images/olive-oil.png',
        100500),
    new Product(
        'Bread',
        0.25,
        '/images/bread.png',
        300)]
