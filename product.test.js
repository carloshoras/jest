const { resetProducts,  addProduct, removeProduct, getProducts, getProduct, updateProduct} = require('./product');


beforeEach(() => {
    resetProducts();
});

describe('addProduct', () => 
  it('should add a product', () => {
    addProduct('Apples', 100);
    const products = getProducts()
    expect(products.length).toBe(1);
    expect(products[0]).toEqual({ id: 1, name: 'Apples', price: 100 });
  }),

  it('should fail when adding a repeated product', () => {
    addProduct('Apples', 100);
    expect(() => addProduct('Apples', 90)).toThrow('El producto ya existe');
  }),

  it('should fail when adding a product with no name', () => {
    expect(() => addProduct(undefined, 100)).toThrow('El nombre no está definido');
  }),

  it('should fail when adding a product with no price', () => {
    expect(() => addProduct('Mangos', undefined)).toThrow('El precio no está definido');
  })
);

describe('removeProduct', () => {
  it('should remove a product', () => {
    addProduct('Bananas', 200);
    removeProduct(1);
    const products = getProducts();
    expect(products.length).toBe(0);
  });

  it('should fail when trying to delete a product that does not exist', () => {
    expect(() => removeProduct(999)).toThrow('El producto no existe');
  });
});

describe('getProduct', () => {
  it('should get a product', () => {
    addProduct('Apples', 100)
    addProduct('Bananas', 200);
    expect(getProduct(2)).toEqual({ id: 2, name: 'Bananas', price: 200 });
  });

  it('should fail when trying to get a product that does not exist', () => {
    expect(() => getProduct(999)).toThrow('El producto no existe')
  });
});

describe('updateProduct', () => {

  it('should update a product', () => {
    addProduct('Apples', 100);
    updateProduct(1, 'Green Apples', 150);
    expect(getProduct(1)).toEqual({ id: 1, name: 'Green Apples', price: 150 });
  });

  it('should fail when updating a product that does not exist', () => {
    addProduct('Apples', 100);
    expect(() => updateProduct(999, 'Oranges', 200)).toThrow('El producto no existe');
  });

  it('should only update the price', () => {
    addProduct('Apples', 100);
    updateProduct(1, undefined, 120);
    const updatedProduct = getProduct(1);
    expect(updatedProduct.name).toBe('Apples'); 
    expect(updatedProduct.price).toBe(120);
  });

  it('should only update the name', () => {
    addProduct('Apples', 100);
    updateProduct(1, 'Red Apples', undefined);
    const updatedProduct = getProduct(1);
    expect(updatedProduct.name).toBe('Red Apples');
    expect(updatedProduct.price).toBe(100);
  });
});
