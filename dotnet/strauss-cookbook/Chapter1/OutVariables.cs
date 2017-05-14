using System;

namespace strauss_cookbook.Chapter1
{
    class OutVariables
    {
        public static void Do(string[] args)
        {
            string sValue = "500";
            if (int.TryParse(sValue, out int intVal))
            {
                Console.WriteLine($"{intVal} is valid integer");
            }
        }    
    }
}