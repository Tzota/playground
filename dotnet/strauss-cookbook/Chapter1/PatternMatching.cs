using System;
using System.Collections.Generic;


namespace strauss_cookbook.Chapter1
{
    public class PatternMatching
    {
        public static void Do(string[] args)
        {
            var pm = new PatternMatching();
            
            pm.OutputInformation(
                new Student { 
                    Name = "Daniyal", 
                    LastName = "Guliev", 
                    CourseCodes = new List<int> {1,2,3} 
                }
            );

            pm.OutputInformation(
                new Student { 
                    Name = "Alex", 
                    LastName = "Chetverukhin", 
                    CourseCodes = new List<int> {4,5,6} 
                }
            );

            pm.OutputInformation(
                new Professor { 
                    Name = "Valentin", 
                    LastName = "Borisevitch", 
                    TeachesSubject = new List<string> {"1", "2", "3"} 
                }
            );
        }

        public void OutputInformation(object person)
        {
            switch(person) {
                case Student student when (student.CourseCodes.Contains(2)):
                    Console.WriteLine($"Student {student.Name} with course 2");
                    break;
                case Student student:
                    Console.WriteLine($"Student {student.Name}");
                    break;
                case Professor professor:
                    Console.WriteLine($"Professor {professor.LastName}");
                    break;
                case null:
                    Console.WriteLine($"Object {nameof(person)} is null");
                    break;
                default:
                    Console.WriteLine("Unknown type");
                    break;
            }
        }

        class Student
        {
            public string Name {get;set;}
            public string LastName {get;set;}
            public List<int> CourseCodes {get;set;}
        }

        class Professor
        {
            public string Name {get;set;}
            public string LastName {get;set;}

            public List<string> TeachesSubject {get;set;}
        }
    }
}