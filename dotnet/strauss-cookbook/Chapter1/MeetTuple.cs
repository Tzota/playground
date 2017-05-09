using System;
using System.Linq;
using static System.Console;

namespace strauss_cookbook.Chapter1
{
    public class MeetTuple
    {
        public static void Do(string[] args)
        {
            int[] scores = {2, 2, 3, 4, 5};
            var ch1 = new MeetTuple();
            var (average, count) = ch1.GetAverageAndCount(scores);
            WriteLine($"Agerage is {average} across {count}");
        }

        public (float average, int count) GetAverageAndCount(int[] scores)
        {
            var returnTuple = (avg: 0F, cnt: 0);
            returnTuple.avg = (float)scores.Sum() / scores.Count();
            returnTuple.cnt = scores.Count();

            return returnTuple;
        }
    }
}