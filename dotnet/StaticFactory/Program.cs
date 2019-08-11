using System;
using Infrastructure;
using Domain;

namespace StaticFactory
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(AbstractFactory.Create<ConcreteFactoryA>().GetType().Name);
        }
    }
}
