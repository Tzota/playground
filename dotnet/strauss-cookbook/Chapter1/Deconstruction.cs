using System;
using System.Collections.Generic;

namespace strauss_cookbook.Chapter1
{
    public class Deconstruction
    {
        public static void Do(string[] args)
        {
            // Через метод класса
            Student student = new Student();
            student.Name = "Dirk";
            student.LastName = "Strauss";
            var (FirstName, Surname) = student;
            Console.WriteLine($"The student name is {FirstName} {Surname}");

            // Через метод расширения
            Professor professor = new Professor { Name = "Valentin", LastName = "Borisevich" };
            var (F, L) = professor;
            Console.WriteLine($"The professor name is {F} {L}");
        }

        /// <summary>
        /// Через метод класса
        /// </summary>
        class Student
        {
            public string Name {get;set;}
            public string LastName {get;set;}
            public List<int> CourseCodes {get;set;}

            public void Deconstruct(out string name, out string lastname)
            {
                name = Name;
                lastname = LastName;
            }
        }

        /// <summary>
        /// Через метод расширения
        /// </summary>
        public class Professor
        {
            public string Name {get;set;}
            public string LastName {get;set;}

            public List<string> TeachesSubject {get;set;}
        }
    }

    public static class DeconstructionExtensions
    {
        public static void Deconstruct(this Deconstruction.Professor professor, out string firstItem, out string secondItem)
        {
            firstItem = professor.Name;
            secondItem = professor.LastName;
        }
    }
}