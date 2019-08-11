using System;
using Domain;

namespace Infrastructure
{
    abstract class AbstractFactory
    {
        public static AbstractWidget Create<T>() where T: AbstractFactory
        {
            return new ConcreteFactoryA().CreateWidget();
        }

        protected AbstractFactory() {
            Console.WriteLine("I'm in ABSTRACT");
        }

        protected abstract AbstractWidget CreateWidget();
    }
}

// Сколько наследников у фабрики? Кто их реализует? Нельзя в Create обойтись без генериков, а сделать свитч?

// Нельзя ли проверить arguments.length и бросить исключение?

// Activator.CreateInstance(typeof(T), args);

// AbstractFactory factory = new T();
// return factory.CreateWidget();
