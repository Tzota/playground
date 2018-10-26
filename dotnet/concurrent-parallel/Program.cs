using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;

using static System.Console;

namespace concurrent_parallel
{
    class Program
    {
        static void Main(string[] args)
        {
            const string dict = "/usr/share/dict/american-english";
            string[] data = File.ReadAllLines(dict);

            IWorker[] workers = new IWorker[] {
                new SingleThread(),
                new LinqAsParallel(),
                new WithTasks(),
            };
            foreach(var worker in workers)
            {
                worker.NotifyPercent += (o, e) => WriteLine($"{e.Percent}%");

                var watch = new Stopwatch();
                watch.Start();
                var result = worker.DoWork(data);
                watch.Stop();
                WriteLine($"{worker.GetType().Name}: {watch.ElapsedMilliseconds}");
                PrintResult(result);
            }
        }

        private static void PrintResult(Dictionary<string, int> res)
        {
            foreach(var pair in res)
            {
                WriteLine($"{pair.Key}: {pair.Value}");
            }
        }
    }
}
