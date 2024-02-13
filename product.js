module.exports = { resetProducts,  addProduct, removeProduct, getProducts, getProduct, updateProduct}

let products = []
let id = 1

function addProduct(name, price) {
    if (name==undefined) {
        throw new Error("El nombre no está definido")
    }
    if (price==undefined) {
        throw new Error("El precio no está definido")
    }
    products.forEach((product) => {
        if (product.name === name) {
            throw new Error("El producto ya existe")
        }
    })
    products.push({id: id, name: name, price: price})
    id += 1
}

function removeProduct(id) {
    const initialLength = products.length
    products = products.filter(function (product) {
        return product.id !== id
    })
    if (initialLength === products.length) {
        throw new Error("El producto no existe")
    }
}

function getProducts() {
    return products
}

function resetProducts() {
    products = []
    id = 1
}

function getProduct(id) {
    const product = products.find(product => product.id === id);
    if (product) {
        return product;
    } else {
        throw new Error("El producto no existe");
    }
}

function updateProduct(id, name, price) {
    let found = false
    products.forEach((product) => {
        if (product.id === id) {
            found = true
            product.name = name || product.name
            product.price = price || product.price
        }
    })
    if (found) {
        return
    }
    throw new Error("El producto no existe")
}
