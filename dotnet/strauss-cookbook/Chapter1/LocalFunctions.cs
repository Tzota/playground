using System;
using System.Collections.Generic;


namespace strauss_cookbook.Chapter1
{
    public class LocalFunctions
    {
        public static void Do(string[] args)
        {
            var localFunctions = new LocalFunctions();
            Building building = localFunctions.GetShopfloorSpace(200, 35, 100);
            Console.WriteLine($"The total space for shops is {building.TotalShopFloorSpace} square meters");

            localFunctions.CheckIfClosureOrParameter();
        }

        public Building GetShopfloorSpace(int floorCommonArea, int buildingWidth, int buildingLength)
        {
            Building building = new Building();

            // Внезапно замыкание? Параметр? Смотрим CheckIfClosureOrParameter;
            int delta = 1000;

            building.TotalShopFloorSpace = CalculateShopFloorSpace(floorCommonArea, buildingWidth, buildingLength);


            // !!!
            int CalculateShopFloorSpace(int common, int width, int length)
            {
                return (width * length) - common + delta;
            }

            return building;
        }

        /// <summary>
        /// Лучше, компилятор добавляет как ref переменную...
        /// </summary>
        public void CheckIfClosureOrParameter()
        {
            var a = new MechTesting();
            var b = new MechTesting();
            var outer = 0;

            a.Callback = local_func;

            outer = 1;

            b.Callback = local_func;

            a.Callback();
            b.Callback();

            void local_func() {
                Console.WriteLine("outer var is " + outer);
            }
        }


        public class Building
        {
            public int TotalShopFloorSpace { get; set; }
        }

        public class MechTesting
        {
            public delegate void SomeFunc();

            public SomeFunc Callback {get;set;}
        }
    }
}