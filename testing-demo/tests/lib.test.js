const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');
//describe is to group a bunch of related tests
describe('absolute', ()=>{
    it('should return a +ve number if input is positive', ()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    }); 
    it('should return a +ve number if input is negative', ()=>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    }); 
    it('should return 0 if input is 0', ()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    }); 
});
//the number of tests should be equal to or greater than the number of execution paths

describe('greet', ()=>{
    it('should return a greeting message', ()=>{
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
    });
});

describe('getCurrencies', ()=>{
    it('should return supported currencies', ()=>{
        const result = lib.getCurrencies();
        // Too general
        //expect(result).toBeDefined();
        //Not to be null
        //expect(result).not.toBeNull();
        //Too specific
        // expect(result[0]).toBe('USD');
        // expect(result[1]).toBe('AUD');
        // expect(result[2]).toBe('EUR');
        //Too specific
        //expect(result.length).toBe(3);

        //Proper way
        // expect(result).toContain('USD');
        // expect(result).toContain('AUD');
        // expect(result).toContain('EUR');

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
    });
});

describe('getProduct', ()=>{
    it('should return the product with given id', ()=>{
       const result = lib.getProduct(1);
       //expect(result).toBe({id: 1, price: 10}); // compares object references , so it is different
       expect(result).toEqual({id: 1, price: 10}); // checks object equality
       //expect(result).toMatchObject({id: 1, price: 10}); // checks only if these properties match, even though there are other properties
       //expect(result).toHaveProperty('id', '1');//to check a single property
    })
});

describe('registeruser', ()=>{
    it('should throw if username is falsy', ()=>{
    
        // we cannot get a result and throw it, so to throw exceptions ,we need a callback
        //expect(()=>{ lib.registerUser(null)}).toThrow();

        //null, undefined, NaN, '', 0,false
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a=>{
            expect(() => {lib.registerUser(a)}).toThrow();
        });
    });

    it('should return a user object if valid username is passed', ()=>{
        const result = lib.registerUser('shon');
        expect(result).toMatchObject({username: 'shon'});
        expect(result.id).toBeGreaterThan(0);
    });
});


describe('applyDiscount', ()=>{
    it('should apply 10% discount if customer has more than 10 points', ()=>{
        db.getCustomerSync = function(customerId){
            console.log("fake/mock reading customer");
            return {id: customerId, points: 20};
        }

        const order = {customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', ()=>{
    it('should send an email to the customer', ()=>{

        // const mockFunction = jest.fn();
        // // mockFunction.mockReturnValue(1);
        // mockFunction.mockResolvedValue(1); // mockRejectedValue(new Error('err'))
        // const resullt = mockFunction();

        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
        // db.getCustomerSync = function(customerId){
        //     return {email: 'a'};
        // }

        mail.send = jest.fn();
        // let mailSent = false;
        // mail.send = function(email, message){
        //     mailSent = true;
        // }

        lib.notifyCustomer({customerId: 1 });

        // expect(mailSent).toBe(true);
        expect(mail.send).toHaveBeenCalled(); //assertion , toHaveBeenCalledWith('a', '...')
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
}); // we are just testing the interaction between objects, not the actual functionality here



/*
JEST is a framework built on top of Jasmine
test('description', ()=>{
    expect(ObjectsArray).toMatchSnapshot();
    expect(1).toEqual(1);
    epxect(ObjectsArray).toHaveLength(4);
    expect(ObjectsArray.map(file => file.name)).toEqual(
        [
            '1',
            '2',
            '3',
            '4'
        ]
        );
    });


*/
// if we import a module in node, it is cached in memory and used across multiple files

