using System;

namespace strauss_cookbook.Chapter1
{
    public class MeetTuple
    {
        public static void Do(string[] args)
        {
            int[] scores = {1, 2, 3, 4, 5};
            var ch1 = new MeetTuple();
            var s = ch1.GetAverageAndCount(scores);
        }

        public (int, int) GetAverageAndCount(int[] scores)
        {
            var returnTuple = (0, 0);
            return returnTuple;
        }
    }
}