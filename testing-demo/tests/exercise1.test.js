const lib = require('../exercise1');

describe('FizzBuzz' ,()=>{
    it('it should throw an exception if input is not a number', ()=>{
        expect(()=>{ lib.fizzBuzz([]) }).toThrow();
        expect(()=>{ lib.fizzBuzz(null) }).toThrow();
        expect(()=>{ lib.fizzBuzz(undefined) }).toThrow();
        expect(()=>{ lib.fizzBuzz({}) }).toThrow();
    });
    it('it should return FizzBuzz if divisible by both 3 and 5', ()=>{
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('it should return Buzz if divisible by 5', ()=>{
        const result = lib.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });
    it('it should return Fizz if divisible by 3', ()=>{
        const result = lib.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });
    it('it should return input if not divisible by either 3 or 5', ()=>{
        const result = lib.fizzBuzz(4);
        expect(result).toBe(4);
    })

});